import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: '#f9fafb',
          dark: 'none',
        },
        brand: {
          faint: '#eff6ff', // blue-50
          muted: '#bfdbfe', // blue-200
          subtle: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          emphasis: '#1d4ed8', // blue-700
          inverted: '#ffffff', // white
        }, // カスタムカラーを設定
      },
    },
  },
  plugins: [],
};
export default config;
