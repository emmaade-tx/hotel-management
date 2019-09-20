import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    SAVE_BOOKING,
    SAVE_FAILED,
    SAVE_BOOKING_RECEIVED,
    FETCH_BOOKINGS,
    BOOKINGS_RECEIVED,
    BOOKINGS_REQUEST_FAILED,
    DELETE_BOOKING,
    DELETE_FAILED,
    DELETE_BOOKING_RECEIVED,
    FETCH_BOOKING,
    FETCH_BOOKING_RECEIVED,
    FETCH_BOOKING_FAILED,
    UPDATE_BOOKING,
    UPDATE_BOOKING_RECEIVED,
    UPDATE_BOOKING_FAILED,
    ROOM_DETAILS_RECEIVED,
    ROOM_DETAILS_FAILED,
    FETCH_ROOM_DETAILS,
    BOOKING_DETAILS_RECEIVED,
    BOOKING_DETAILS_FAILED,
    FETCH_BOOKING_DETAILS
 } from '../actions/types';

 function saveBookingApi(data){
    let payload = data.payload;
    let url = api.api_path + api.version_path + api.bookings_path;
    let newPayload = {
        "email": payload.email,
        "full_name": payload.full_name,
        "start_date": payload.start_date,
        "end_date": payload.end_date,
        "room_id": payload.room_id
    }

    return axios.post(url, newPayload);
}

function fetchBookingsApi(payload){
    let params = {};
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.bookings_path,
        params:params,
        crossdomain: true
    });
}

function* fetchBookings(action) {
    try {
        const response = yield call(fetchBookingsApi, action);
        yield put({
            type: BOOKINGS_RECEIVED,
            response
        });
    }
    catch(error) {
        yield put({ type: BOOKINGS_REQUEST_FAILED, error });
    }
}

function* fetchRoomDetails(action) {
    try {
        const response = yield call(fetchRoomDetailsApi, action);
        yield put({ type: ROOM_DETAILS_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: ROOM_DETAILS_FAILED, error });
    }
}


function fetchRoomDetailsApi(payload){
    return axios({
        method: "get",
        url: api.api_path + api.version_path + '/rooms/details',
        crossdomain: true
    });
}

function* saveBooking(action) {
    try {
        const response = yield call(saveBookingApi, action);
        yield put({ type: SAVE_BOOKING_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: SAVE_FAILED, error });
    }
}

function* deleteBooking(action) {
    try {
        const response = yield call(deleteBookingApi, action);
        yield put({ type: DELETE_BOOKING_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: DELETE_FAILED, error });
    }
}

function deleteBookingApi(payload){
    const { bookingId } = payload;
    return axios({
      method: "delete",
      crossdomain: true,
      url: api.api_path + api.version_path + api.bookings_path + "/" + bookingId,
    });
}

function fetchBookingApi(payload) {
    const { bookingId } = payload;
    return axios({
        method: "get",
        crossdomain: true,
        url: api.api_path + api.version_path + api.bookings_path + "/" + bookingId,
    })
}

function* fetchBooking(action) {
    try {
        const response = yield call(fetchBookingApi, action);
        yield put({ type: FETCH_BOOKING_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_BOOKING_FAILED, error });
    }
}

function updateBookingApi(data) {
    const { bookingId, payload } = data;
    const url = api.api_path + api.version_path + api.bookings_path + "/" + bookingId;

    let newPayload = {
        "email": payload.email,
        "full_name": payload.full_name,
        "email": payload.email,
        "start_date": payload.start_date,
        "end_date": payload.end_date,
        "room_id": payload.room_id
    }

    return axios.put(url, newPayload);
}

function* updateBooking(action) {
    try {
        const response = yield call(updateBookingApi, action);
        yield put({ type: UPDATE_BOOKING_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: UPDATE_BOOKING_FAILED, error });
    }
}

function* fetchBookingDetails(action) {
    try {
        const response = yield call(fetchBookingDetailsApi, action);
        yield put({ type: BOOKING_DETAILS_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: BOOKING_DETAILS_FAILED, error });
    }
}

function fetchBookingDetailsApi(payload){
    return axios({
        method: "get",
        url: api.api_path + api.version_path + '/bookings/details',
        crossdomain: true
    });
}

export function* saveBookingSaga() {
    yield takeLatest(SAVE_BOOKING, saveBooking)
}

export function* watchRoomDetailsSaga() {
    yield takeLatest(FETCH_ROOM_DETAILS, fetchRoomDetails)
}

export function* watchBookingsSaga() {
     yield takeLatest( FETCH_BOOKINGS , fetchBookings)
}

export function* watchDeleteBookingSaga() {
    yield takeLatest(DELETE_BOOKING, deleteBooking)
}

export function* watchFetchBookingSaga() {
    yield takeLatest(FETCH_BOOKING, fetchBooking)
}

export function* watchUpdateBookingSaga() {
    yield takeLatest(UPDATE_BOOKING, updateBooking)
}

export function* watchBookingDetailsSaga() {
    yield takeLatest(FETCH_BOOKING_DETAILS, fetchBookingDetails)
}
