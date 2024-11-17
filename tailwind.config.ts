import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Fira Sans', ...defaultTheme.fontFamily.sans]
		},
		extend: {}
	},

	plugins: []
} satisfies Config;
