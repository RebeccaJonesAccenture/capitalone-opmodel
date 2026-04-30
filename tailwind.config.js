/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#460074",
          medium: "#7500C0",
          vivid: "#9900EB",
          soft: "#7401C1",
          lavender: "#C1A3FF",
          tint: "#E8D5FF",
          bg: "#F5EEFF",
        },
        ink: {
          body: "#2D1A3E",
          muted: "#6B5B8A",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(70, 0, 116, 0.06), 0 2px 8px rgba(70, 0, 116, 0.06)",
        cardHover:
          "0 4px 10px rgba(70, 0, 116, 0.1), 0 8px 24px rgba(70, 0, 116, 0.12)",
      },
      borderRadius: {
        card: "8px",
      },
    },
  },
  plugins: [],
};
