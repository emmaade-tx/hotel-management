import  {
    SAVE_BOOKING,
    FETCH_BOOKINGS,
    CLEAR_NOTIFICATION,
    DELETE_BOOKING,
    FETCH_BOOKING,
    FETCH_BOOKING_FAILED,
    UPDATE_BOOKING,
    RESET,
    FETCH_ROOM_DETAILS,
    FETCH_BOOKING_DETAILS
 } from '../actions/types';

export const saveBooking = (payload) => ({
    type: SAVE_BOOKING,
    payload,
});

export const updateBooking = (bookingId, payload) => ({
    type: UPDATE_BOOKING,
    bookingId,
    payload
});

export const resetNotification = () => ({
	type: CLEAR_NOTIFICATION
})
export const fetchAllBookings = () => ({
    type: FETCH_BOOKINGS,
});

export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId,
});

export const dispatchFetchBookingError = () => ({
    type: FETCH_BOOKING_FAILED
});

export const fetchBooking = (bookingId) => ({
    type: FETCH_BOOKING,
    bookingId
})

export const resetActiveBooking = () => ({
    type: RESET
})

export const fetchRoomDetails = () => ({
    type: FETCH_ROOM_DETAILS
})

export const fetchBookingDetails = () => ({
    type: FETCH_BOOKING_DETAILS
})

