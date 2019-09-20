import {
    SAVE_ROOMTYPE,
    SAVE_FAILED,
    SAVE_ROOMTYPE_RECEIVED,
    CLEAR_NOTIFICATION,
    FETCH_ROOMTYPES,
    ROOMTYPES_RECEIVED,
    FETCH_ROOMTYPE_FAILED,
    ROOMTYPES_REQUEST_FAILED,
    DELETE_ROOMTYPE_RECEIVED,
    FETCH_ROOMTYPE_RECEIVED,
    UPDATE_ROOMTYPE_RECEIVED
} from '../actions/types';
import { TABLE_LOAD_SIZE } from '../constants/constants'

const initialState = {
    hasError: false,
    hasSaved: false,
    isLoading: true,
    isSaving: false,
    activeRoomType: null,
    allRoomTypes: [],
    totalRecords: 0
}

export default function roomTypeReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_ROOMTYPE_RECEIVED:
            newState = Object.assign({}, state, { activeRoomType: action.response.data });
            return newState;
        case SAVE_ROOMTYPE:
            newState = Object.assign({}, state, { isSaving:  true });
            return newState;

        case SAVE_FAILED:
            newState = Object.assign({}, state, { isSaving:  false, });
            return newState;

        case SAVE_ROOMTYPE_RECEIVED:
        case UPDATE_ROOMTYPE_RECEIVED:
            newState = Object.assign({}, state, { hasSaved: true, isSaving:  false, activeRoomType: action.response.data });
            return newState;

        case FETCH_ROOMTYPES:
            newState = Object.assign({}, state, { isLoading:  true, hasError: false});
            return newState;

        case ROOMTYPES_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                totalRecords: action.response.data.length,
                allRoomTypes:  action.response.data,
            });
            return newState;

        case ROOMTYPES_REQUEST_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case FETCH_ROOMTYPE_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true});
            return newState;
        case DELETE_ROOMTYPE_RECEIVED:
            newState = Object.assign({}, state, { allRoomTypes: []});
            return newState;
        default:
            return state;
    }
}
