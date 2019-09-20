import {
    RESET,
    FETCH_HOTEL_RECEIVED,
    FETCH_HOTEL_FAILED,
    UPDATE_HOTEL_RECEIVED,
    UPDATE_HOTEL_FAILED
} from '../actions/types';

const initialState = {
    hotel: {},
    isLoading: false,
    false: false,
    isSaving: false,
    edit: false
};

export default function userReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_HOTEL_RECEIVED:
            newState = Object.assign({}, state, {hotel: action.response.data, hasError: false});
            return newState;
        case UPDATE_HOTEL_FAILED:
        case FETCH_HOTEL_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true});
            return newState;
        case UPDATE_HOTEL_RECEIVED:
            newState = Object.assign({}, state, { hasSaved: true, isSaving:  false, hotel: action.response.data });
            return newState;
        default:
            return state;
    }
}
