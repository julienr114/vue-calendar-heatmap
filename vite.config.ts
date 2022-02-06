import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{
				find       : '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [ vue(), dts() ],
	build  : {
		lib          : {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name : 'CalendarHeatmap'
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: [ 'vue' ],
			output  : {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
});
