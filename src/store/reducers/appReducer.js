
const appState = {
  navToggled: false
}

// Reducer
const appReducer = (state = appState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return { 
        ...state,
        navToggled: !state.navToggled
      };
    default:
      return state;
  }
}

export default appReducer;