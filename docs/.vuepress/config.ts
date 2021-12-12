import type { DefaultThemeOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
	lang       : 'en-US',
	title      : 'Calendar Heatmap',
	description: 'Vue 3 Calendar Heatmap',
	base       : isProd ? '/vue3-calendar-heatmap/' : '/',
	themeConfig: {
		logo: 'https://vuejs.org/images/logo.png'
	}
});
