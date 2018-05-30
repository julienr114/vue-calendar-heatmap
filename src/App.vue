<template>
  <div id="app">
    <calendar-heatmap :end-date="today" :values="values" :vertical="false" />
    <calendar-heatmap :end-date="today" :values="values" :vertical="true" />
  </div>
</template>

<script>
import CalendarHeatmap from './CalendarHeatmap.vue'

export default {
  components: {
    CalendarHeatmap
  },

  data () {
    return {
      today: new Date(),
      values: [
        { date: '2017-11-09', count: 1 },
        { date: '2017-11-20', count: 1 },
        { date: '2018-02-08', count: 1 },
        { date: '2018-02-09', count: 7 },
        { date: '2018-02-10', count: 18 },
        { date: '2018-02-11', count: 19 },
        { date: '2018-02-12', count: 8 },
        { date: '2018-02-13', count: 14 },
        { date: '2018-02-14', count: 5 },
        { date: '2018-02-15', count: 9 },
        { date: '2018-02-16', count: 5 },
        { date: '2018-02-17', count: 1 },
        { date: '2018-02-18', count: 2 },
        { date: '2018-02-19', count: 7 },
        { date: '2018-02-20', count: 6 },
        { date: '2018-02-21', count: 7 },
        { date: '2018-02-22', count: 3 },
        { date: '2018-02-24', count: 6 },
        { date: '2018-02-25', count: 4 },
        { date: '2018-02-26', count: 26 },
        { date: '2018-02-27', count: 48 },
        { date: '2018-02-28', count: 37 },
        { date: '2018-03-01', count: 22 },
        { date: '2018-03-02', count: 16 },
        { date: '2018-03-03', count: 32 },
        { date: '2018-03-04', count: 6 },
        { date: '2018-03-05', count: 15 },
        { date: '2018-03-06', count: 5 },
        { date: '2018-03-07', count: 39 },
        { date: '2018-03-08', count: 23 },
        { date: '2018-03-09', count: 3 },
        { date: '2018-03-10', count: 17 },
        { date: '2018-03-11', count: 9 },
        { date: '2018-03-12', count: 12 },
        { date: '2018-03-14', count: 2 },
        { date: '2018-03-13', count: 7 },
        { date: '2018-03-16', count: 17 },
        { date: '2018-03-19', count: 50 },
        { date: '2018-03-20', count: 8 },
        { date: '2018-03-22', count: 8 },
        { date: '2018-03-26', count: 28 },
        { date: '2018-03-27', count: 17 },
        { date: '2018-03-28', count: 1 },
        { date: '2018-04-02', count: 8 },
        { date: '2018-04-04', count: 7 },
        { date: '2018-04-09', count: 11 },
        { date: '2018-04-08', count: 3 },
        { date: '2018-04-16', count: 17 },
        { date: '2018-04-17', count: 10 },
        { date: '2018-04-18', count: 11 },
        { date: '2018-04-19', count: 5 },
        { date: '2018-04-20', count: 5 },
        { date: '2018-04-23', count: 16 },
        { date: '2018-04-24', count: 27 },
        { date: '2018-04-25', count: 5 },
        { date: '2018-04-26', count: 4 },
        { date: '2018-04-27', count: 8 },
        { date: '2018-04-28', count: 9 },
        { date: '2018-04-29', count: 38 },
        { date: '2018-04-30', count: 53 },
        { date: '2018-05-01', count: 7 },
        { date: '2018-05-02', count: 29 },
        { date: '2018-05-06', count: 1 },
        { date: '2018-05-10', count: 31 },
        { date: '2018-05-11', count: 9 },
        { date: '2018-05-12', count: 7 },
        { date: '2018-05-13', count: 1 },
        { date: '2018-05-14', count: 26 }
      ]
    }
  }
}
</script>
