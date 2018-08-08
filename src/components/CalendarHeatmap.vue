<template lang="pug">
  svg.vch__wrapper(:viewBox="viewbox")
      g.vch__months__labels__wrapper(:transform="monthsLabelWrapperTransform[position]")
        text.vch__month__label(
          v-for="(month, index) in heatmap.firstFullWeekOfMonths",
          :x="getMonthLabelPostion(month).x",
          :y="getMonthLabelPostion(month).y"
        ) {{ lo.months[month.value] }}

      g.vch__days__labels__wrapper(:transform="daysLabelWrapperTransform[position]")
        text.vch__day__label(
          :x="vertical ? SQUARE_SIZE * 1 : 0",
          :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 20"
        ) {{ lo.days[1] }}
        text.vch__day__label(
          :x="vertical ? SQUARE_SIZE * 3 : 0",
          :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 44"
        ) {{ lo.days[3] }}
        text.vch__day__label(
          :x="vertical ? SQUARE_SIZE * 5 : 0",
          :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 69"
        ) {{ lo.days[5] }}

      g.vch__legend__wrapper(:transform="legendWrapperTransform[position]")
        text(
          :x="vertical ? SQUARE_SIZE * 1.25 : -25"
          :y="vertical ? 8 : SQUARE_SIZE + 1"
        ) {{ lo.less }}
        rect(
          v-for="(color, index) in rangeColor",
          :key="index",
          :style="{ fill: color }",
          :width="SQUARE_SIZE - SQUARE_BORDER_SIZE",
          :height="SQUARE_SIZE - SQUARE_BORDER_SIZE",
          :x="vertical ? SQUARE_SIZE * 1.75 : SQUARE_SIZE * index",
          :y="vertical ? SQUARE_SIZE * (index + 1) : 5"
        )
        text(
          :x="vertical ? SQUARE_SIZE * 1.25 : SQUARE_SIZE * rangeColor.length + 1",
          :y="vertical ? SQUARE_SIZE * (rangeColor.length + 2) - SQUARE_BORDER_SIZE : SQUARE_SIZE + 1"
          ) {{ lo.more }}
      g.vch__year__wrapper(:transform="yearWrapperTransform")
        g.vch__month__wrapper(
          v-for="(week, weekIndex) in heatmap.calendar",
          :key="weekIndex",
          :transform="getWeekPosition(weekIndex)"
        )
          rect.vch__day__square(
            v-for="(day, dayIndex) in week",
            v-if="day.date < now"
            :key="dayIndex",
            :transform="getDayPosition(dayIndex)"
            :width="SQUARE_SIZE - SQUARE_BORDER_SIZE",
            :height="SQUARE_SIZE - SQUARE_BORDER_SIZE",
            :style="{ fill: rangeColor[day.colorIndex] }",
            v-tooltip="tooltipOptions(day)",
            @click="$emit('day-click', day)"
          )
</template>

<script>
import { VTooltip } from 'v-tooltip'
import Heatmap from './Heatmap'
import { DAYS_IN_WEEK, DEFAULT_LOCALE, DEFAULT_RANGE_COLOR, DEFAULT_TOOLTIP_UNIT, SQUARE_SIZE } from './consts.js'

VTooltip.enabled = window.innerWidth > 768

export default {
  directives: {
    tooltip: VTooltip
  },

  props: {
    endDate: {
      required: true
    },
    max: {
      type: Number
    },
    rangeColor: {
      type: Array,
      default: () => DEFAULT_RANGE_COLOR
    },
    values: {
      required: true,
      type: Array
    },
    locale: {
      type: Object
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipUnit: {
      type: String,
      default: DEFAULT_TOOLTIP_UNIT
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      now: new Date()
    }
  },

  computed: {
    position () {
      return this.vertical ? 'vertical' : 'horizontal'
    },
    tooltipTransform () {
      return `translate(${this.tooltipX}, ${this.tooltipY})`
    },
    heatmap () {
      return new Heatmap(this.endDate, this.values, this.max)
    },
    width () {
      return {
        horizontal: this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * this.heatmap.weekCount) + this.SQUARE_BORDER_SIZE,
        vertical: this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * DAYS_IN_WEEK) + this.RIGHT_SECTION_WIDTH
      }
    },
    heigth () {
      return {
        horizontal: this.TOP_SECTION_HEIGTH + (this.SQUARE_SIZE * DAYS_IN_WEEK) + this.SQUARE_BORDER_SIZE + this.BOTTOM_SECTION_HEIGTH,
        vertical: this.TOP_SECTION_HEIGTH + (this.SQUARE_SIZE * this.heatmap.weekCount) + this.SQUARE_BORDER_SIZE
      }
    },
    viewbox () {
      return `0 0 ${this.width[this.position]} ${this.heigth[this.position]}`
    },
    daysLabelWrapperTransform () {
      return {
        horizontal: `translate(0, ${this.TOP_SECTION_HEIGTH})`,
        vertical: `translate(${this.LEFT_SECTION_WIDTH}, 0)`
      }
    },
    monthsLabelWrapperTransform () {
      return {
        horizontal: `translate(${this.LEFT_SECTION_WIDTH}, 0)`,
        vertical: `translate(0, ${this.TOP_SECTION_HEIGTH})`
      }
    },
    legendWrapperTransform () {
      return {
        horizontal: `translate(${this.width[this.position] - (this.SQUARE_SIZE * this.rangeColor.length) - 30}, ${this.heigth[this.position] - this.BOTTOM_SECTION_HEIGTH})`,
        vertical: `translate(${this.LEFT_SECTION_WIDTH + (this.SQUARE_SIZE * DAYS_IN_WEEK)}, ${this.TOP_SECTION_HEIGTH})`
      }
    },
    yearWrapperTransform () {
      return `translate(${this.LEFT_SECTION_WIDTH}, ${this.TOP_SECTION_HEIGTH})`
    },

    SQUARE_BORDER_SIZE: () => SQUARE_SIZE / 5,
    SQUARE_SIZE () { return SQUARE_SIZE + this.SQUARE_BORDER_SIZE },
    TOP_SECTION_HEIGTH () { return SQUARE_SIZE + (SQUARE_SIZE / 2) },
    RIGHT_SECTION_WIDTH () { return this.SQUARE_SIZE * 3 },
    BOTTOM_SECTION_HEIGTH () { return SQUARE_SIZE + (SQUARE_SIZE / 2) },
    LEFT_SECTION_WIDTH () { return Math.ceil(SQUARE_SIZE * 2.5) },

    lo () {
      if (this.locale) {
        return {
          months: this.locale.months || DEFAULT_LOCALE.months,
          days: this.locale.days || DEFAULT_LOCALE.days,
          on: this.locale.on || DEFAULT_LOCALE.on,
          less: this.locale.less || DEFAULT_LOCALE.less,
          more: this.locale.more || DEFAULT_LOCALE.more
        }
      }
      return DEFAULT_LOCALE
    }
  },

  methods: {
    tooltipOptions (day) {
      if (this.tooltip) {
        return {
          content: `<b>${day.count} ${this.tooltipUnit}</b> ${this.lo.on} ${this.lo.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
          delay: { show: 150, hide: 50 }
        }
      }
      return false
    },
    getWeekPosition (index) {
      if (this.vertical) {
        return `translate(0, ${(this.SQUARE_SIZE * this.heatmap.weekCount) - ((index + 1) * this.SQUARE_SIZE)})`
      }
      return `translate(${index * this.SQUARE_SIZE}, 0)`
    },
    getDayPosition (index) {
      if (this.vertical) {
        return `translate(${index * this.SQUARE_SIZE}, 0)`
      }
      return `translate(0, ${index * this.SQUARE_SIZE})`
    },
    getMonthLabelPostion (month) {
      let position = { x: 0, y: 0 }
      position.x = this.vertical ? 3 : this.SQUARE_SIZE * month.index
      position.y = this.vertical ? (this.SQUARE_SIZE * this.heatmap.weekCount) - (this.SQUARE_SIZE * (month.index)) - (this.SQUARE_SIZE / 4) : this.SQUARE_SIZE - this.SQUARE_BORDER_SIZE
      return position
    }
  }
}
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

<style>
  .vue-tooltip-theme.tooltip {
    display: block !important;
    z-index: 10000;
  }

  .vue-tooltip-theme.tooltip .tooltip-inner {
    background: rgba(0, 0, 0, .7);
    border-radius: 3px;
    color: #ebedf0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 16px;
    padding: 14px 10px;
  }

  .vue-tooltip-theme.tooltip .tooltip-inner b {
    color: white;
  }

  .vue-tooltip-theme.tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  .vue-tooltip-theme.tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .vue-tooltip-theme.tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .vue-tooltip-theme.tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .vue-tooltip-theme.tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .vue-tooltip-theme.tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .vue-tooltip-theme.tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .vue-tooltip-theme.tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .vue-tooltip-theme.tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .vue-tooltip-theme.tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .vue-tooltip-theme.tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
