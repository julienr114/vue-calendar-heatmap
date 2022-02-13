import type { DefaultThemeOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import path from 'path';
import { navbar, sidebar } from './configs';

const isPublish = process.env.IS_PUBLISH === 'yes';

export default defineUserConfig<DefaultThemeOptions>({
	lang         : 'en-US',
	title        : 'Calendar Heatmap',
	description  : 'Simple Heatmap Component for Vue 3',
	base         : isPublish ? '/vue3-calendar-heatmap/' : '/',
	bundler      : '@vuepress/vite',
	bundlerConfig: {
		viteOptions: {
			resolve: {
				alias: [
					{
						find       : '@',
						replacement: path.resolve(__dirname, '../../src')
					}
				]
			}
		}
	},
	themeConfig  : {
		logo        : 'https://vuejs.org/images/logo.png',
		repo        : 'razorness/vue3-calendar-heatmap',
		docsDir     : 'docs',
		locales     : {
			/**
			 * English locale config
			 *
			 * As the default locale of @vuepress/theme-default is English,
			 * we don't need to set all of the locale fields
			 */
			'/': {
				// navbar
				navbar,

				// sidebar
				sidebar,

				// page meta
				editLinkText: 'Edit this page on GitHub'
			}
		},
		themePlugins: {
			// only enable git plugin in production mode
			git: true,
			// use shiki plugin in production mode instead
			prismjs: false
		}
	},
	plugins      : [
		[
			'@vuepress/plugin-register-components',
			{
				componentsDir: path.resolve(__dirname, './components'),
				components   : {
					CalendarHeatmap: path.resolve(__dirname, '../../src/components/CalendarHeatmap.vue')
				}
			}
		],
		[
			'@vuepress/plugin-shiki',
			{ theme: 'dark-plus' }
		]
	]
});

