<template>
	<div style="display: flex; justify-content: center">
		<calendar-heatmap
			:values="data"
			:end-date="endDate"
			:style="{
				'max-width': orientation === 'vertical' ? '145px' :  '675px',
				width: '100%'
			}"
			:round="round"
			:vertical="orientation === 'vertical'"
			:dark-mode="isDarkMode"
			:range-color="rangeColor"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType, ref } from 'vue';
	import { useDarkMode } from '@vuepress/theme-default/lib/client';
	import { data } from '@/data';

	export default defineComponent({
		name : 'Demo',
		props: {
			initialRound: Number,
			orientation : {
				type   : String as PropType<'vertical' | 'horizontal'>,
				default: 'horizontal'
			},
			withSlider  : Boolean,
			rangeColor  : {
				type: Array as PropType<string[]>
			}
		},
		setup(props) {

			const round      = ref(props.initialRound || 2),
				  isDarkMode = useDarkMode();

			return {
				data, round, isDarkMode,
				endDate: new Date('2021-08-01')
			};
		}
	});
</script>

<style src="@vueform/slider/themes/default.css"></style>
