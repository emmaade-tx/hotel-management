import { all, fork } from 'redux-saga/effects';
import * as roomSagas from './roomSaga';
import * as roomTypeSagas from './roomTypeSaga';
import * as bookingSagas from './bookingSaga';
import * as authSagas from './authSaga';
import * as hotelSagas from './hotelSaga';
import * as priceListSagas from './priceListSaga';

// import watchers from other files
export default function* rootSaga() {
  yield all([
        ...Object.values(roomSagas),
        ...Object.values(roomTypeSagas),
        ...Object.values(bookingSagas),
        ...Object.values(authSagas),
        ...Object.values(hotelSagas),
        ...Object.values(priceListSagas),
        // add other watchers to the array
    ].map(fork));
}
