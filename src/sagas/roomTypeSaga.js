import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    SAVE_ROOMTYPE,
    SAVE_FAILED,
    SAVE_ROOMTYPE_RECEIVED,
    FETCH_ROOMTYPES,
    ROOMTYPES_RECEIVED,
    ROOMTYPES_REQUEST_FAILED,
    DELETE_ROOMTYPE,
    DELETE_FAILED,
    DELETE_ROOMTYPE_RECEIVED,
    FETCH_ROOMTYPE,
    FETCH_ROOMTYPE_RECEIVED,
    FETCH_ROOMTYPE_FAILED,
    UPDATE_ROOMTYPE,
    UPDATE_ROOMTYPE_RECEIVED,
    UPDATE_ROOMTYPE_FAILED,
    ROOM_DETAILS_RECEIVED,
    ROOM_DETAILS_FAILED,
    FETCH_ROOM_DETAILS
 } from '../actions/types';

 function saveRoomTypeApi(data){
    let payload = data.payload;
    let url = api.api_path + api.version_path + api.roomType_path;
    let newPayload = {
        "name": payload.name
    }

    return axios.post(url, newPayload);
}

function fetchRoomTypesApi(payload){
    let params = {};
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.roomTypes_path,
        params:params,
        crossdomain: true
    });
}

function* fetchRoomTypes(action) {
    try {
        const response = yield call(fetchRoomTypesApi, action);
        yield put({
            type: ROOMTYPES_RECEIVED,
            response
        });
    }
    catch(error) {
        yield put({ type: ROOMTYPES_REQUEST_FAILED, error });
    }
}

function* saveRoomType(action) {
    try {
        const response = yield call(saveRoomTypeApi, action);
        yield put({ type: SAVE_ROOMTYPE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: SAVE_FAILED, error });
    }
}

function* deleteRoomType(action) {
    try {
        const response = yield call(deleteRoomTypeApi, action);
        yield put({ type: DELETE_ROOMTYPE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: DELETE_FAILED, error });
    }
}

function deleteRoomTypeApi(payload){
    const { roomTypeId } = payload;
    return axios({
      method: "delete",
      crossdomain: true,
      url: api.api_path + api.version_path + api.roomType_path + "/" + roomTypeId,
    });
}

function fetchRoomTypeApi(payload) {
    const { roomTypeId } = payload;
    return axios({
        method: "get",
        crossdomain: true,
        url: api.api_path + api.version_path + api.roomType_path + "/" + roomTypeId,
    })
}

function* fetchRoomType(action) {
    try {
        const response = yield call(fetchRoomTypeApi, action);
        yield put({ type: FETCH_ROOMTYPE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_ROOMTYPE_FAILED, error });
    }
}

function updateRoomTypeApi(data) {
    const { roomTypeId, payload } = data;
    const url = api.api_path + api.version_path + api.roomType_path + "/" + roomTypeId;

    let newPayload = {
        "name": payload.name,
    }

    return axios.put(url, newPayload);
}

function* updateRoomType(action) {
    try {
        const response = yield call(updateRoomTypeApi, action);
        yield put({ type: UPDATE_ROOMTYPE_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: UPDATE_ROOMTYPE_FAILED, error });
    }
}

export function* saveRoomTypeSaga() {
    yield takeLatest(SAVE_ROOMTYPE, saveRoomType)
}

export function* watchRoomTypesSaga() {
     yield takeLatest( FETCH_ROOMTYPES , fetchRoomTypes)
}

export function* watchDeleteRoomTypeSaga() {
    yield takeLatest(DELETE_ROOMTYPE, deleteRoomType)
}

export function* watchFetchRoomTypeSaga() {
    yield takeLatest(FETCH_ROOMTYPE, fetchRoomType)
}

export function* watchUpdateRoomTypeSaga() {
    yield takeLatest(UPDATE_ROOMTYPE, updateRoomType)
}
