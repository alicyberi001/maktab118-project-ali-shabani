import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		animation: {
			fadeIn: "fadeIn 0.3s ease-out forwards",
		  },
		  keyframes: {
			fadeIn: {
			  "0%": { opacity: '0', transform: "scale(0.95)" },
			  "100%": { opacity: '1', transform: "scale(1)" },
			},
		  },
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	screens: {
  		desktop: {
  			max: '1279px'
  		},
  		tablet2: {
  			max: '1023px'
  		},
  		tablet: {
  			max: '767px'
  		},
  		mobile: {
  			max: '639px'
  		}
  	}
  },
  plugins: [require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
      require("tailwindcss-animate"),
	  require('tailwind-scrollbar-hide')
],
} satisfies Config;
