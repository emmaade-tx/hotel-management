import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    FETCH_HOTEL,
    UPDATE_HOTEL,
    RESET,
    FETCH_HOTEL_RECEIVED,
    FETCH_HOTEL_FAILED,
    UPDATE_HOTEL_RECEIVED,
    UPDATE_HOTEL_FAILED
 } from '../actions/types';

function fetchHotelApi() {
    let url = api.api_path + api.version_path + api.hotel_path

    return axios({
        method: "get",
        url: url,
        crossdomain: true
    });
}

function* getHotel(action) {
    console.log("saga")
    try {
        const response = yield call(fetchHotelApi, action);

        yield put({ type: FETCH_HOTEL_RECEIVED, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: FETCH_HOTEL_FAILED, error });
    }
}

function updateHotelApi(data) {
    const { payload } = data;
    const url = api.api_path + api.version_path + api.hotel_path;
    console.log("update my friend", url)
    let newPayload = {
        "name": payload.name,
        "address": payload.address,
        "city": payload.city,
        "state": payload.state,
        "zip_code": payload.zip_code,
        "country": payload.country,
        "phone_number": payload.phone_number,
        "email": payload.email,
        "image": payload.image
    }

    return axios.put(url, newPayload);
}

function* updateHotel(action) {

    try {
        const response = yield call(updateHotelApi, action);
        yield put({ type: UPDATE_HOTEL_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: UPDATE_HOTEL_FAILED, error });
    }
}

export function* getHotelSaga() {
    yield takeLatest(FETCH_HOTEL, getHotel)
}

export function* watchUpdateHotelSaga() {
    yield takeLatest(UPDATE_HOTEL, updateHotel)
}
