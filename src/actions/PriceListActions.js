import  {
    SAVE_PRICELIST,
    FETCH_PRICELISTS,
    CLEAR_NOTIFICATION,
    DELETE_PRICELIST,
    FETCH_PRICELIST,
    FETCH_PRICELIST_FAILED,
    UPDATE_PRICELIST,
    RESET,
    FETCH_ROOM_DETAILS,
    FETCH_ROOMTYPES
 } from '../actions/types';

export const savePriceList = (payload) => ({
    type: SAVE_PRICELIST,
    payload,
});

export const updatePriceList = (priceListId, payload) => ({
    type: UPDATE_PRICELIST,
    priceListId,
    payload
});

export const resetNotification = () => ({
    type: CLEAR_NOTIFICATION
})
export const fetchAllPriceLists = () => ({
    type: FETCH_PRICELISTS,
});

export const deletePriceList = (priceListId) => ({
    type: DELETE_PRICELIST,
    priceListId,
});

export const dispatchFetchPriceListError = () => ({
    type: FETCH_PRICELIST_FAILED
});

export const fetchPriceList = (priceListId) => ({
    type: FETCH_PRICELIST,
    priceListId
})

export const resetActivePriceList = () => ({
    type: RESET
})

export const fetchRoomDetails = () => ({
    type: FETCH_ROOM_DETAILS
})

export const fetchRoomTypes = () => ({
    type: FETCH_ROOMTYPES
})

