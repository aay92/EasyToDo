/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Путь к вашим компонентам
  ],
  theme: {
    extend: {
      colors: {
        mainGrayBG: "#ffffff",
        toDoListBG: "#f5f5f5",
        titleBG: "#ead9d7",
        textLightGray: "#8a8a8a",
        toDoListInputBG: "#fefefe",
        toDoItemBG: "#ffffff",
        textToDoList: "#414141",
      },
      boxShadow: {
        "bottom-custom": (color) => `0px 4px 6px ${color}`, // Тень вниз с динамическим цветом
      },
    },
  },
  plugins: [],
};
