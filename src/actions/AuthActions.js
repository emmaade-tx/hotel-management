import  {  FETCH_TOKEN, LOGOUT, RESET, REGISTER_USER, REGISTER_FAILED } from '../actions/types';

export const fetchToken  = (payload ) => ({
      type: FETCH_TOKEN,
      payload
});

export const registerUser  = (payload ) => ({
      type: REGISTER_USER,
      payload
});

export const logoutUser = () => ({
    type: LOGOUT
});

export const clearStore = () => ({
    type: RESET
});

export const dispatchRegisterError = () => ({
    type: REGISTER_FAILED
});


