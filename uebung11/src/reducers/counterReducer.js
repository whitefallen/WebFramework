const initialState = {counterHistory: [], counter: 0};

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case "INCREASE_COUNTER":
      state = {
        ...state,
        counter: state.counter +1,
        counterHistory: [...state.counterHistory, state.counter]
      }
      break;
    default:
  }
  return state;
}

export default counterReducer;
