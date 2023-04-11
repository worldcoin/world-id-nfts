const mirrorHexColors = (colors) =>
  Object.fromEntries(
    colors.map((color, index) => {
      if (!/#[a-f0-9]{6}/.test(color)) {
        console.warn(
          'All colors should be lowercase hexadecimal strings 7 characters long with "#" sign at the beginning'
        );
      }

      if (colors.indexOf(color) !== index) {
        console.warn("Colors should be unique");
      }

      if (colors[index - 1] > color) {
        console.warn("Colors should be sorted alphabetically");
      }

      return [color.substring(1), color];
    })
  );

module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "Arial, Helvetica, sans-serif"],
        rubik: ["Rubik", "Arial, Helvetica, sans-serif"],
      },
      colors: mirrorHexColors([
        "#3c424b",
        "#dfc298",
        "#e4cba4",
        "#f68d60",
        "#f8edd6",
        "#f9edd6",
      ]),
    },
  },
  plugins: [],
};
