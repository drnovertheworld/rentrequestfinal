import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#14213D", accent: "#0F766E", paper: "#F7F8FA" }, fontFamily: { sans: ["Inter","system-ui","sans-serif"] } } },
} satisfies Config;
