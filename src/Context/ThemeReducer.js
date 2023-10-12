// ThemeReducer.js
const themeReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_THEME":
        return { ...state, isDarkMode: !state.isDarkMode };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  