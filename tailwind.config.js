/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollSnapType: {
        y: "y mandatory",
      },
      scrollSnapAlign: {
        start: "start",
        center: "center",
      },
    },
  },
  plugins: [
    require('tailwind-scroll-snap'),
  ],
};
