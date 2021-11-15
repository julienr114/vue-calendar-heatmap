<template>
	<svg ref="svg" class="vch__wrapper" :viewBox="viewbox">
		<g class="vch__months__labels__wrapper" :transform="monthsLabelWrapperTransform[position]">
			<text
				class="vch__month__label"
				v-for="(month, index) in heatmap.firstFullWeekOfMonths"
				:key="index"
				:x="getMonthLabelPosition(month).x"
				:y="getMonthLabelPosition(month).y"
			>
				{{ lo.months[ month.value ] }}
			</text>
		</g>

		<g class="vch__days__labels__wrapper" :transform="daysLabelWrapperTransform[position]">
			<text class="vch__day__label"
				  :x="vertical ? SQUARE_SIZE : 0"
				  :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 20"
			>
				{{ lo.days[ 1 ] }}
			</text>
			<text class="vch__day__label"
				  :x="vertical ? SQUARE_SIZE * 3 : 0"
				  :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 44"
			>
				{{ lo.days[ 3 ] }}
			</text>
			<text class="vch__day__label"
				  :x="vertical ? SQUARE_SIZE * 5 : 0"
				  :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 69"
			>
				{{ lo.days[ 5 ] }}
			</text>
		</g>

		<g class="vch__legend__wrapper" :transform="legendWrapperTransform[position]">
			<text :x="vertical ? SQUARE_SIZE * 1.25 : -25" :y="vertical ? 8 : SQUARE_SIZE + 1">{{ lo.less }}</text>
			<rect
				v-for="(color, index) in rangeColor"
				:key="index"
				:rx="round"
				:ry="round"
				:style="{ fill: color }"
				:width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
				:height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
				:x="vertical ? SQUARE_SIZE * 1.75 : SQUARE_SIZE * index"
				:y="vertical ? SQUARE_SIZE * (index + 1) : 5"
			/>
			<text
				:x="vertical ? SQUARE_SIZE * 1.25 : SQUARE_SIZE * rangeColor.length + 1"
				:y="vertical ? SQUARE_SIZE * (rangeColor.length + 2) - SQUARE_BORDER_SIZE : SQUARE_SIZE + 1"
			>
				{{ lo.more }}
			</text>
		</g>

		<g class="vch__year__wrapper" :transform="yearWrapperTransform">
			<g class="vch__month__wrapper"
			   v-for="(week, weekIndex) in heatmap.calendar"
			   :key="weekIndex"
			   :transform="getWeekPosition(weekIndex)"
			>
				<template v-for="(day, dayIndex) in week" :key="dayIndex">
					<rect class="vch__day__square"
						  v-if="day.date < now"
						  :rx="round"
						  :ry="round"
						  :transform="getDayPosition(dayIndex)"
						  :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
						  :height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
						  :style="{ fill: rangeColor[day.colorIndex] }"
						  :data-tippy-content="tooltipOptions(day)"
						  @click="$emit('day-click', day)"
					/>
				</template>
			</g>
		</g>
	</svg>
</template>

<script lang="ts">
	import { defineComponent, nextTick, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from 'vue';
	import { CalendarItem, Heatmap, Locale, Month, Position, TooltipFormatter, Value } from '@/Heatmap';
	import tippy, { createSingleton, CreateSingletonInstance, Instance } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/dist/svg-arrow.css';

	type Transform<T = string> = Record<Position, T>;

	export default /*#__PURE__*/defineComponent({
		name    : 'CalendarHeatmap',
		props   : {
			endDate         : {
				required: true
			},
			max             : {
				type: Number
			},
			rangeColor      : {
				type   : Array as PropType<string[]>,
				default: Heatmap.DEFAULT_RANGE_COLOR
			},
			values          : {
				type    : Array as PropType<Value[]>,
				required: true
			},
			locale          : {
				type: Object as PropType<Partial<Locale>>
			},
			tooltip         : {
				type   : Boolean,
				default: true
			},
			tooltipUnit     : {
				type   : String,
				default: Heatmap.DEFAULT_TOOLTIP_UNIT
			},
			tooltipFormatter: {
				type: Function as PropType<TooltipFormatter>
			},
			vertical        : {
				type   : Boolean,
				default: false
			},
			noDataText      : {
				type   : String,
				default: null
			},
			round           : {
				type   : Number,
				default: 0
			}
		},
		emits   : [ 'day-click' ],
		computed: {
			position(): Position {
				return this.vertical ? Position.VERTICAL : Position.HORIZONTAL;
			},
			width(): Transform<number> {
				return {
					[ Position.HORIZONTAL ]: this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * this.heatmap!.weekCount) + this.SQUARE_BORDER_SIZE,
					[ Position.VERTICAL ]  : this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * Heatmap.DAYS_IN_WEEK) + this.RIGHT_SECTION_WIDTH
				};
			},
			heigth(): Transform<number> {
				return {
					[ Position.HORIZONTAL ]: this.TOP_SECTION_HEIGTH + (this.SQUARE_SIZE * Heatmap.DAYS_IN_WEEK) + this.SQUARE_BORDER_SIZE + this.BOTTOM_SECTION_HEIGTH,
					[ Position.VERTICAL ]  : this.TOP_SECTION_HEIGTH + (this.SQUARE_SIZE * this.heatmap!.weekCount) + this.SQUARE_BORDER_SIZE
				};
			},
			viewbox(): string {
				return `0 0 ${this.width[ this.position ]} ${this.heigth[ this.position ]}`;
			},
			daysLabelWrapperTransform(): Transform {
				return {
					[ Position.HORIZONTAL ]: `translate(0, ${this.TOP_SECTION_HEIGTH})`,
					[ Position.VERTICAL ]  : `translate(${this.LEFT_SECTION_WIDTH}, 0)`
				};
			},
			monthsLabelWrapperTransform(): Transform {
				return {
					[ Position.HORIZONTAL ]: `translate(${this.LEFT_SECTION_WIDTH}, 0)`,
					[ Position.VERTICAL ]  : `translate(0, ${this.TOP_SECTION_HEIGTH})`
				};
			},
			legendWrapperTransform(): Transform {
				return {
					[ Position.HORIZONTAL ]: `translate(${this.width[ this.position ] - (this.SQUARE_SIZE * this.rangeColor.length) - 30}, ${this.heigth[ this.position ] - this.BOTTOM_SECTION_HEIGTH})`,
					[ Position.VERTICAL ]  : `translate(${this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * Heatmap.DAYS_IN_WEEK)}, ${this.TOP_SECTION_HEIGTH})`
				};
			},
			yearWrapperTransform(): string {
				return `translate(${this.LEFT_SECTION_WIDTH}, ${this.TOP_SECTION_HEIGTH})`;
			},

			SQUARE_BORDER_SIZE(): number {
				return Heatmap.SQUARE_SIZE / 5;
			},
			SQUARE_SIZE(): number {
				return Heatmap.SQUARE_SIZE + this.SQUARE_BORDER_SIZE;
			},
			TOP_SECTION_HEIGTH(): number {
				return Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
			},
			RIGHT_SECTION_WIDTH(): number {
				return this.SQUARE_SIZE * 3;
			},
			BOTTOM_SECTION_HEIGTH(): number {
				return Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
			},
			LEFT_SECTION_WIDTH(): number {
				return Math.ceil(Heatmap.SQUARE_SIZE * 2.5);
			},
			lo(): Locale {
				if (this.locale) {
					return {
						months: this.locale.months || Heatmap.DEFAULT_LOCALE.months,
						days  : this.locale.days || Heatmap.DEFAULT_LOCALE.days,
						on    : this.locale.on || Heatmap.DEFAULT_LOCALE.on,
						less  : this.locale.less || Heatmap.DEFAULT_LOCALE.less,
						more  : this.locale.more || Heatmap.DEFAULT_LOCALE.more
					};
				}
				return Heatmap.DEFAULT_LOCALE;
			}
		},
		methods : {
			tooltipOptions(day: CalendarItem) {
				if (this.tooltip) {
					if (day.count !== undefined) {
						if (this.tooltipFormatter) {
							return this.tooltipFormatter(day, this.tooltipUnit);
						}
						return `<b>${day.count} ${this.tooltipUnit}</b> ${this.lo.on} ${this.lo.months[ day.date.getMonth() ]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
					} else if (this.noDataText) {
						return `${this.noDataText}`;
					}
				}
				return undefined;
			},
			getWeekPosition(index: number) {
				if (this.vertical) {
					return `translate(0, ${(this.SQUARE_SIZE * this.heatmap!.weekCount) - ((index + 1) * this.SQUARE_SIZE)})`;
				}
				return `translate(${index * this.SQUARE_SIZE}, 0)`;
			},
			getDayPosition(index: number) {
				if (this.vertical) {
					return `translate(${index * this.SQUARE_SIZE}, 0)`;
				}
				return `translate(0, ${index * this.SQUARE_SIZE})`;
			},
			getMonthLabelPosition(month: Month) {
				if (this.vertical) {
					return { x: 3, y: (this.SQUARE_SIZE * this.heatmap!.weekCount) - (this.SQUARE_SIZE * (month.index)) - (this.SQUARE_SIZE / 4) };
				}
				return { x: this.SQUARE_SIZE * month.index, y: this.SQUARE_SIZE - this.SQUARE_BORDER_SIZE };
			}
		},
		setup(props) {
			let tippyInstances: Instance[],
				tippySingleton: CreateSingletonInstance;

			const svg     = ref<null | SVGElement>(null),
				  now     = ref(new Date()),
				  heatmap = ref(new Heatmap(props.endDate as Date, props.values, props.max));

			function initTippy() {
				tippyInstances = tippy(Array.from(svg.value!.querySelectorAll('.vch__day__square[data-tippy-content]')));
				if (tippySingleton) {
					tippySingleton.setInstances(tippyInstances);
				} else {
					tippySingleton = createSingleton(tippyInstances, {
						moveTransition: 'transform 0.1s ease-out',
						allowHTML     : true
					});
				}
			}


			const { values, tooltipUnit, tooltipFormatter, noDataText, max, rangeColor } = toRefs(props);
			watch(
				[ values, tooltipUnit, tooltipFormatter, noDataText, max, rangeColor ],
				() => {
					heatmap.value = new Heatmap(props.endDate as Date, props.values, props.max);
					tippyInstances?.map(i => i.destroy());
					nextTick(initTippy);
				}
			);

			onMounted(initTippy);
			onBeforeUnmount(() => {
				tippySingleton?.destroy();
				tippyInstances?.map(i => i.destroy());
			});

			return {
				svg, heatmap, now
			};
		}
	});
</script>

<style scoped>
	svg.vch__wrapper {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		line-height: 10px;
	}

	svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label {
		font-size: 10px;
	}

	svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label,
	svg.vch__wrapper .vch__legend__wrapper text {
		font-size: 9px;
	}

	svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label,
	svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label,
	svg.vch__wrapper .vch__legend__wrapper text {
		fill: #767676;
	}

	svg.vch__wrapper rect.vch__day__square:hover {
		stroke: #555;
		stroke-width: 1px;
	}

	svg.vch__wrapper rect.vch__day__square:focus {
		outline: none;
	}
</style>
