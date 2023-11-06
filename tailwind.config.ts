import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /(bg|text)-+/,
      variants: [
        'dark', 'prose-a', 'hover', 'hover:dark', 'hover:dark:prose-a'
      ]
    },
  ],
  theme: {
    fontFamily: {            
      'sans': ['"Barlow Condensed"', 'system-ui'],
      'serif': ['"Nunito"', 'system-ui'],      
    },
  },
  darkMode: 'class', 
  plugins: [
    require('@tailwindcss/typography')
  ],  
}
export default config
