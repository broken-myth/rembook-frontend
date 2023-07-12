/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false,
	},
	content: [
		"./src/Pages/**/*.{html,tsx}",
		"./src/Components/**/*.{html,tsx}",
	],
	theme: {
		extend: {
			colors: {
				turquoise: "#41EAD4",
				black: "#000000",
				white: "#FFFFFF",
				"dark-green": "#143D3D",
				green: "#A1DCE0",
				violet: "#22006B",
				blue: "#1750AC",
			},
			fontFamily: {
				heading: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
