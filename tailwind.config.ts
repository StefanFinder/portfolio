import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-bg': '#0a0a1f',
        'accent-blue': '#3a4aaa',
        'accent-purple': '#6644aa',
        'text-primary': '#e8e8f0',
        'text-muted': '#8899cc',
        'card-bg': 'rgba(255,255,255,0.04)',
        'card-border': 'rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #3a4aaa, #6644aa)',
      },
    },
  },
  plugins: [],
}

export default config
