/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: () => ({
        // For default styles, see https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        DEFAULT: {
          css: {
            a: {
              textDecoration: "none",
            },
            blockquote: {
              fontWeight: "normal",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
            h1: {
              fontWeight: "normal",
            },
            h2: {
              fontWeight: "normal",
            },
            h3: {
              fontWeight: "normal",
            },
          },
        },
      }),
    },
  },
};

/*
Gray
050: #F9FAFB
100: #F3F4F6
200: #E5E7EB
300: #D1D5DB
400: #9CA3AF
500: #6B7280
600: #4B5563
700: #374151
800: #1F2937
900: #111827

Blue
050: #EFF6FF
100: #DBEAFE
200: #BFDBFE
300: #93C5FD
400: #60A5FA
500: #3B82F6
600: #2563EB
700: #1D4ED8
800: #1E40AF
900: #1E3A8A
*/
