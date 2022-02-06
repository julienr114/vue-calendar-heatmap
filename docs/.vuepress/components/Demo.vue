<template>
	<calendar-heatmap
		:values="data"
		:end-date="endDate"
		:style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}"
		:round="round"
		:vertical="orientation === 'vertical'"
		:dark-mode="isDarkMode"
	/>
	<slider v-model="round" :min="0" :max="5" :lazy="false"/>
	<h1>{{ isDarkMode }}</h1>
</template>

<script lang="ts">
	import { defineComponent, PropType, ref } from 'vue';
	import { useDarkMode } from '@vuepress/theme-default/lib/client';
	import { data } from '@/data';
	import Slider from '@vueform/slider';

	export default defineComponent({
		name      : 'Demo',
		components: { Slider },
		props     : {
			initialRound: Number,
			orientation : {
				type   : String as PropType<'vertical' | 'horizontal'>,
				default: 'horizontal'
			},
			withSlider  : Boolean
		},
		setup(props) {

			const round      = ref(props.initialRound || 0),
				  isDarkMode = useDarkMode();

			return {
				data, round, isDarkMode,
				endDate: new Date('2021-08-01')
			};
		}
	});
</script>

<style src="@vueform/slider/themes/default.css"></style>
