import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    // container : {
    //   center : true,
    //   padding : {
    //   DEFAULT : "1rem",
    //   lg : "0.625rem"
    //   }
    //   },
    screens: {
			desktop: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			tablet2: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			tablet: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			mobile: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
  },
  plugins: [require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
} satisfies Config;
