import { combineReducers } from 'redux';
import { default as RoomStore } from './roomReducer';
import { default as UserStore } from './userReducer';
import { default as NotificationStore } from './notificationReducer';
import { default as BookingStore } from './bookingReducer';
import { default as HotelStore } from './hotelReducer';
import { default as RoomTypeStore } from './roomTypeReducer';
import { default as PriceListStore } from './priceListReducer';

import { RESET } from '../actions/types';

const appReducer = combineReducers({
    RoomStore,
    UserStore,
    NotificationStore,
    BookingStore,
    HotelStore,
    RoomTypeStore,
    PriceListStore
});

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        state = undefined;
    }
    return appReducer(state, action);
};
export default rootReducer;
