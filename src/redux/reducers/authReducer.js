const initialState = {
  user: null,
  token: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SIGNUP_FAIL':
    case 'SIGNIN_FAIL':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
