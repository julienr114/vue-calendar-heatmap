<template>
	<div>
		<h4>None</h4>
		<calendar-heatmap :values="[]" :end-date="endDate" style="max-width: 675px"/>
		<br>
		<h4>Some</h4>
		<calendar-heatmap :values="values" :end-date="endDate" style="max-width: 675px"/>
		<br>
		<h4>Locale</h4>
		<calendar-heatmap :values="values" :end-date="endDate" style="max-width: 675px" :locale="{
			months: [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ],
			days  : [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ],
			on    : 'am',
			less  : 'Weniger',
			more  : 'Mehr'
		}"/>
		<br>
		<h4>TooltipFormatter</h4>
		<calendar-heatmap
			:values="values"
			:end-date="endDate"
			style="max-width: 675px"
			:tooltip-formatter="(c) => c.count ? c.count / 3600 / 1000 : 'NÖX'"
			no-data-text="NIX"
			tooltip-unit="Dings"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Vue3CalendarHeatmap from '@/CalendarHeatmap.vue';
	import CalendarHeatmap from '@/CalendarHeatmap.vue';
	import { data } from './data';

	export default defineComponent({
		name      : 'ServeDev',
		components: {
			CalendarHeatmap,
			Vue3CalendarHeatmap
		},
		data() {
			return {
				values : data,
				endDate: new Date('2021-08-01')
			};
		}
	});
</script>

