import type { DefaultThemeOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';

const isPublish = process.env.IS_PUBLISH === 'yes';

export default defineUserConfig<DefaultThemeOptions>({
	lang       : 'en-US',
	title      : 'Calendar Heatmap',
	description: 'Vue 3 Calendar Heatmap',
	base       : isPublish ? '/vue3-calendar-heatmap/' : '/',
	themeConfig: {
		logo: 'https://vuejs.org/images/logo.png'
	}
});
