import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SIGNUP_FAIL', payload: err.response.data });
  }
};

export const signin = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/signin', userData);
    dispatch({ type: 'SIGNIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SIGNIN_FAIL', payload: err.response.data });
  }
};
