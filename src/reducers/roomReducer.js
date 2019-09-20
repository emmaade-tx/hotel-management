import {
    SAVE_ROOM,
    SAVE_FAILED,
    SAVE_ROOM_RECEIVED,
    CLEAR_NOTIFICATION,
    FETCH_ROOMS,
    ROOMS_RECEIVED,
    FETCH_ROOM_FAILED,
    ROOMS_REQUEST_FAILED,
    DELETE_ROOM_RECEIVED,
    FETCH_ROOM_RECEIVED,
    UPDATE_ROOM_RECEIVED,
    ROOM_TYPES_RECEIVED,
    ROOM_TYPES_FAILED
} from '../actions/types';
import { TABLE_LOAD_SIZE } from '../constants/constants'

const initialState = {
    hasError: false,
    hasSaved: false,
    isLoading: true,
    isSaving: false,
    activeRoom: null,
    allRooms: [],
    allRoomTypes: [],
    totalRecords: 0
}

export default function roomReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_ROOM_RECEIVED:
            newState = Object.assign({}, state, { activeRoom: action.response.data });
            return newState;
        case SAVE_ROOM:
            newState = Object.assign({}, state, { isSaving:  true });
            return newState;

        case SAVE_FAILED:
            newState = Object.assign({}, state, { isSaving:  false, });
            return newState;

        case SAVE_ROOM_RECEIVED:
        case UPDATE_ROOM_RECEIVED:
            newState = Object.assign({}, state, { hasSaved: true, isSaving:  false, activeRoom: action.response.data });
            return newState;

        case FETCH_ROOMS:
            newState = Object.assign({}, state, { isLoading:  true, hasError: false});
            return newState;

        case ROOMS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                totalRecords: action.response.data.length,
                allRooms:  action.response.data,
            });

            return newState;

        case ROOMS_REQUEST_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case FETCH_ROOM_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true});
            return newState;
        case DELETE_ROOM_RECEIVED:
            newState = Object.assign({}, state, { allRooms: []});
            return newState;
        default:
            return state;
    }
}
