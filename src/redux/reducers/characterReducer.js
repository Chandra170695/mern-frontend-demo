const initialState = {
  characters: [],
  next: null,
  previous: null,
  error: null,
};

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS_SUCCESS':
      return {
        ...state,
        characters: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case 'FETCH_CHARACTERS_FAIL':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
