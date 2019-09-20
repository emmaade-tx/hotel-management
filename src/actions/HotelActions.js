import  {  FETCH_HOTEL,  UPDATE_HOTEL, RESET, FETCH_HOTEL_FAILED} from '../actions/types';

export const fetchHotel  = () => ({
      type: FETCH_HOTEL,
});

export const updateHotel = (payload) => ({
    type: UPDATE_HOTEL,
    payload
});

export const clearStore = () => ({
    type: RESET
});
export const dispatchFetchHotelError = () => ({
    type: FETCH_HOTEL_FAILED
});
