import  {
    SAVE_ROOM,
    FETCH_ROOMS,
    CLEAR_NOTIFICATION,
    DELETE_ROOM,
    FETCH_ROOM,
    FETCH_ROOM_FAILED,
    UPDATE_ROOM,
    RESET,
    FETCH_ROOM_TYPES,
    FETCH_ROOMTYPES
 } from '../actions/types';

export const saveRoom = (payload) => ({
    type: SAVE_ROOM,
    payload,
});

export const updateRoom = (roomId, payload) => ({
    type: UPDATE_ROOM,
    roomId,
    payload
});

export const resetNotification = () => ({
	type: CLEAR_NOTIFICATION
})
export const fetchAllRooms = () => ({
    type: FETCH_ROOMS,
});

export const deleteRoom = (roomId) => ({
    type: DELETE_ROOM,
    roomId,
});

export const dispatchFetchRoomError = () => ({
    type: FETCH_ROOM_FAILED
});

export const fetchRoom = (roomId) => ({
    type: FETCH_ROOM,
    roomId
})

export const resetActiveRoom = () => ({
    type: RESET
})

export const fetchRoomTypes = () => ({
    type: FETCH_ROOMTYPES
})
