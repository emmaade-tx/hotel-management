import {
    SAVE_BOOKING,
    SAVE_FAILED,
    SAVE_BOOKING_RECEIVED,
    CLEAR_NOTIFICATION,
    FETCH_BOOKINGS,
    BOOKINGS_RECEIVED,
    FETCH_BOOKING_FAILED,
    BOOKINGS_REQUEST_FAILED,
    DELETE_BOOKING_RECEIVED,
    FETCH_BOOKING_RECEIVED,
    UPDATE_BOOKING_RECEIVED,
    ROOM_DETAILS_RECEIVED,
    ROOM_DETAILS_FAILED,
    BOOKING_DETAILS_RECEIVED,
    BOOKING_DETAILS_FAILED
} from '../actions/types';
import { TABLE_LOAD_SIZE } from '../constants/constants'

const initialState = {
    hasError: false,
    hasSaved: false,
    isLoading: true,
    isSaving: false,
    activeBooking: null,
    allBookings: [],
    allRoomDetails: [],
    totalRecords: 0,
    allBookingDetails: [],
}

export default function bookingReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_BOOKING_RECEIVED:
            newState = Object.assign({}, state, { activeBooking: action.response.data });
            return newState;
        case SAVE_BOOKING:
            newState = Object.assign({}, state, { isSaving:  true });
            return newState;

        case SAVE_FAILED:
            newState = Object.assign({}, state, { isSaving:  false, });
            return newState;

        case SAVE_BOOKING_RECEIVED:
        case UPDATE_BOOKING_RECEIVED:
            newState = Object.assign({}, state, { hasSaved: true, isSaving:  false, activeBooking: action.response.data });
            return newState;

        case FETCH_BOOKINGS:
            newState = Object.assign({}, state, { isLoading:  true, hasError: false});
            return newState;

        case BOOKINGS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                totalRecords: action.response.data.length,
                allBookings:  action.response.data,
            });

            return newState;

        case ROOM_DETAILS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                allRoomDetails:  action.response ? action.response.data.data : []
            });
            return newState;

        case ROOM_DETAILS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case BOOKING_DETAILS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                allBookingDetails:  action.response ? action.response.data.data : []
            });
            return newState;

        case BOOKING_DETAILS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case BOOKINGS_REQUEST_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case FETCH_BOOKING_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true});
            return newState;
        case DELETE_BOOKING_RECEIVED:
            newState = Object.assign({}, state, { allBookings: []});
            return newState;
        default:
            return state;
    }
}
