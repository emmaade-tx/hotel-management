import  {
    SAVE_ROOMTYPE,
    FETCH_ROOMTYPES,
    CLEAR_NOTIFICATION,
    DELETE_ROOMTYPE,
    FETCH_ROOMTYPE,
    FETCH_ROOMTYPE_FAILED,
    UPDATE_ROOMTYPE,
    RESET,
 } from '../actions/types';

export const saveRoomType = (payload) => ({
    type: SAVE_ROOMTYPE,
    payload,
});

export const updateRoomType = (roomTypeId, payload) => ({
    type: UPDATE_ROOMTYPE,
    roomTypeId,
    payload
});

export const resetNotification = () => ({
	type: CLEAR_NOTIFICATION
})
export const fetchAllRoomTypes = () => ({
    type: FETCH_ROOMTYPES,
});

export const deleteRoomType = (roomTypeId) => ({
    type: DELETE_ROOMTYPE,
    roomTypeId,
});

export const dispatchFetchRoomTypeError = () => ({
    type: FETCH_ROOMTYPE_FAILED
});

export const fetchRoomType = (roomTypeId) => ({
    type: FETCH_ROOMTYPE,
    roomTypeId
})

export const resetActiveRoomType = () => ({
    type: RESET
})

