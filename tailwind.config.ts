import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'norwester': ['Norwester', 'sans-serif'],
        'metanoia': ['Metanoia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;