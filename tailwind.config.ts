import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
} satisfies Config
