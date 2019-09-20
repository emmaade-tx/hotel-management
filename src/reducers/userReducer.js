import {
    TOKEN,
    LOGOUT,
    REGISTER_FAILED,
    REGISTER_SUCCESSFUL
} from '../actions/types';

const initialState = {
    authenticated: false,
    isLoading: false,
    isAdmin: false,
    registerSuccess: false,
    hasError: false
};

export default function userReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case TOKEN:
            newState = Object.assign({}, state, {authenticated: true});
            return newState;
        case LOGOUT:
            localStorage.removeItem('userId');
            localStorage.removeItem('roleId');
            localStorage.removeItem('token');
            return state;
        case REGISTER_SUCCESSFUL:
            newState = Object.assign({}, state, {registerSuccess: true});
            return newState;
        case REGISTER_SUCCESSFUL:
            newState = Object.assign({}, state, {registerSuccess: true});
            return newState;
        case REGISTER_FAILED:
            newState = Object.assign({}, state, {registerSuccess: false, hasError: true});
            return newState;
        default:
            return state;
    }
}
