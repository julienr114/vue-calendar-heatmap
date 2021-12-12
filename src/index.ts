import { App } from 'vue';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';

function install(Vue: App) {
	Vue.component(CalendarHeatmap.name, CalendarHeatmap);
}

export default { install };
export * from '@/components/Heatmap';
export { default as CalendarHeatmap } from '@/components/CalendarHeatmap.vue';
