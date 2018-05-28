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
            :height="SQUARE_SIZE - 1"
            :style="{ fill: rangeColor[day.colorIndex] }"
          )
</template>

<script>
import Heatmap from './Heatmap'
import { DAYS_IN_WEEK, DEFAULT_LOCALE, DEFAULT_RANGE_COLOR, SQUARE_SIZE } from './consts.js'

export default {
  name: 'CalendarHeatmap',

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
    }
  },

  computed: {
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
          No: this.locale.No || DEFAULT_LOCALE.No,
          on: this.locale.on || DEFAULT_LOCALE.on,
          Less: this.locale.Less || DEFAULT_LOCALE.Less,
          More: this.locale.More || DEFAULT_LOCALE.More
        }
      }
      return DEFAULT_LOCALE
    }
  },

  methods: {
    getWeekPosition (index) {
      return `translate(${index * this.SQUARE_SIZE}, 0)`
    },
    getDayPosition (index) {
      return `translate(0, ${index * this.SQUARE_SIZE})`
    }
  },

  mounted () {
    this.$nextTick(() => {
      console.log(this.heatmap.activities)
    })
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
</style>
