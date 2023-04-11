module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "Arial, Helvetica, sans-serif"],
        rubik: ["Rubik", "Arial, Helvetica, sans-serif"],
      },
      colors: {
        grey: {
          DEFAULT: "#191c20",
          100: "#f3f4f5",
          200: "#ebecef",
          300: "#d6d9dd",
          500: "#657080",
          700: "#3c424b",
          900: "#191c20",
        },
        orange: {
          DEFAULT: "#f68d60",
        },
        blue: {
          DEFAULT: "#203a70",
        },
        purple: {
          DEFAULT: "#9d50ff",
          secondary: "#f7f1ff",
        },
        success: {
          DEFAULT: "#00c313",
          secondary: "#ebfaec",
        },
        info: {
          DEFAULT: "#506dff",
        },
        sand: {
          DEFAULT: "#f9edd6",
          300: "#f8edd6",
          500: "#e4cba4",
          700: "#dfc298",
        },
      },
    },
  },
  plugins: [],
};
