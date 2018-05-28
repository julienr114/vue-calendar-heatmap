<template lang="pug">
  #app
    calendar-heatmap(
      :end-date="today",
      :values="values"
    )
</template>

<script>
import CalendarHeatmap from '@/CalendarHeatmap.vue'

export default {
  components: {
    CalendarHeatmap
  },

  data () {
    return {
      today: new Date(),
      values: [
        { date: '2017-06-02', count: 1 },
        { date: '2017-06-12', count: 2 },
        { date: '2017-06-13', count: 3 },
        { date: '2017-06-14', count: 4 },
        { date: '2017-06-15', count: 5 },
        { date: '2017-06-16', count: 6 },
        { date: '2017-06-17', count: 7 },
        { date: '2017-06-18', count: 8 },
        { date: '2017-06-19', count: 9 },
        { date: '2017-06-20', count: 10 },
        { date: '2017-06-21', count: 11 },
        { date: '2017-06-22', count: 12 },
        { date: '2017-06-23', count: 13 },
        { date: '2017-06-24', count: 14 },
        { date: '2017-06-25', count: 15 },
        { date: '2017-06-26', count: 16 },
        { date: '2017-06-28', count: 17 },
        { date: '2017-06-29', count: 1 },
        { date: '2017-07-01', count: 1 },
        { date: '2017-07-04', count: 1 },
        { date: '2017-07-10', count: 1 },
        { date: '2017-07-11', count: 1 },
        { date: '2017-07-17', count: 3 },
        { date: '2017-07-19', count: 1 },
        { date: '2017-09-06', count: 2 },
        { date: '2017-09-12', count: 1 },
        { date: '2017-09-27', count: 1 },
        { date: '2018-02-14', count: 2 },
        { date: '2018-04-24', count: 14 },
        { date: '2018-04-25', count: 1 },
        { date: '2018-04-30', count: 4 },
        { date: '2018-05-03', count: 12 },
        { date: '2018-05-04', count: 2 },
        { date: '2018-05-06', count: 1 },
        { date: '2018-05-07', count: 1 }
      ]
    }
  }
}
</script>
