import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        discord_black: "#313338",
        discord_left: "#1E1F22",
        discord_button: "#5863F8",
        white: "#FFFFFF",

        everyone: "#C9CDFB",
        everyone_bg: "#4A4B72",

        ceo: "#F1C40F",
        ceo_bg: "#4C483F",

        video_editor: "#3498DB",
        video_editor_bg: "#43484A",

        customer_service: "#E91E63",
        customer_service_bg: "#563E3D",

        funnel_builders: "#2FCC71",
        funnel_builders_bg: "#444E3F",
      }
    },
  },
  plugins: [],
} satisfies Config;
