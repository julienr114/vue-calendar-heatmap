import Vue from 'vue'
import CalendarHeatmap from './CalendarHeatmap.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(CalendarHeatmap)
}).$mount('#app')
