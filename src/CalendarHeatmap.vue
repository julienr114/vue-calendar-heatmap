<template lang="pug">
  svg.vch__wrapper(:viewBox="viewbox")
      g.vch__months__labels__wrapper(:transform="monthsLabelWrapperTransform")
        text.vch__month__label(
          v-for="(month, index) in heatmap.firstFullWeekOfMonths",
          :x="SQUARE_SIZE * month.index",
          :y="SQUARE_SIZE - SQUARE_BORDER_SIZE"
        ) {{ lo.months[month.value] }}

      g.vch__days__labels__wrapper(:transform="daysLabelWrapperTransform")
        text.vch__day__label(x="0", :y="20") {{ lo.days[1] }}
        text.vch__day__label(x="0", :y="44") {{ lo.days[3] }}
        text.vch__day__label(x="0", :y="69") {{ lo.days[5] }}

      g.vch__year__wrapper(:transform="yearWrapperTransform")
        g.vch__month__wrapper(
          v-for="(week, weekIndex) in heatmap.calendar",
          :key="weekIndex",
          :transform="getWeekPosition(weekIndex)"
        )
          rect.vch__day__square(
            v-for="(day, dayIndex) in week",
            :key="dayIndex",
            :transform="getDayPosition(dayIndex)"
            :width="SQUARE_SIZE - 1",
            :height="SQUARE_SIZE - 1",
            :style="{ fill: rangeColor[day.colorIndex] }",
            v-tooltip="tooltipOptions(day)"
          )
</template>

<script>
import { VTooltip } from 'v-tooltip'
import Heatmap from './Heatmap'
import { DAYS_IN_WEEK, DEFAULT_LOCALE, DEFAULT_RANGE_COLOR, DEFAULT_TOOLTIP_UNIT, SQUARE_SIZE } from './consts.js'

VTooltip.enabled = window.innerWidth > 768

export default {
  name: 'CalendarHeatmap',

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
    }
  },

  computed: {
    tooltipTransform () {
      return `translate(${this.tooltipX}, ${this.tooltipY})`
    },
    heatmap () {
      return new Heatmap(this.endDate, this.values, this.max)
    },
    width () {
      return this.DAYS_LABELS_WIDTH + (this.SQUARE_SIZE * this.heatmap.weekCount) + this.SQUARE_BORDER_SIZE
    },
    heigth () {
      return this.WEEKS_LABELS_HEIGTH + (this.SQUARE_SIZE * DAYS_IN_WEEK) + this.SQUARE_BORDER_SIZE
    },
    viewbox () {
      return `0 0 ${this.width} ${this.heigth}`
    },
    daysLabelWrapperTransform () {
      return `translate(0, ${this.WEEKS_LABELS_HEIGTH})`
    },
    monthsLabelWrapperTransform () {
      return `translate(${this.DAYS_LABELS_WIDTH}, 0)`
    },
    yearWrapperTransform () {
      return `translate(${this.DAYS_LABELS_WIDTH}, ${this.WEEKS_LABELS_HEIGTH})`
    },

    SQUARE_BORDER_SIZE: () => SQUARE_SIZE / 5,
    SQUARE_SIZE () { return SQUARE_SIZE + this.SQUARE_BORDER_SIZE },
    WEEKS_LABELS_HEIGTH () { return SQUARE_SIZE + (SQUARE_SIZE / 2) },
    DAYS_LABELS_WIDTH () { return Math.ceil(SQUARE_SIZE * 2.5) },

    lo () {
      if (this.locale) {
        return {
          months: this.locale.months || DEFAULT_LOCALE.months,
          days: this.locale.days || DEFAULT_LOCALE.days,
          on: this.locale.on || DEFAULT_LOCALE.on,
          Less: this.locale.Less || DEFAULT_LOCALE.Less,
          More: this.locale.More || DEFAULT_LOCALE.More
        }
      }
      return DEFAULT_LOCALE
    }
  },

  methods: {
    tooltipOptions (day) {
      return {
        content: `<b>${day.count} ${this.tooltipUnit}</b> ${this.lo.on} ${this.lo.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
        delay: { show: 150, hide: 50 }
      }
    },
    getWeekPosition (index) {
      return `translate(${index * this.SQUARE_SIZE}, 0)`
    },
    getDayPosition (index) {
      return `translate(0, ${index * this.SQUARE_SIZE})`
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

  svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label {
    font-size: 9px;
  }

  svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label,
  svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label {
    fill: #767676;
  }

  svg.vch__wrapper rect.vch__day__square {
    rx: 1;
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
  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: rgba(0, 0, 0, .7);
    border-radius: 3px;
    color: #ebedf0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 16px;
    padding: 14px 10px;
  }

  .tooltip .tooltip-inner b {
    color: white;
  }

  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
