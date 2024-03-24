/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "#03071c",
        primary: "#344fdf",
        secondary: "#11268e",
        accent: "#1338f0",
      },
    },
  },
  plugins: [],
}
