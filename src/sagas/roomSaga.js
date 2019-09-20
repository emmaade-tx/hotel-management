import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    SAVE_ROOM,
    SAVE_FAILED,
    SAVE_ROOM_RECEIVED,
    FETCH_ROOMS,
    ROOMS_RECEIVED,
    ROOMS_REQUEST_FAILED,
    DELETE_ROOM,
    DELETE_FAILED,
    DELETE_ROOM_RECEIVED,
    FETCH_ROOM,
    FETCH_ROOM_RECEIVED,
    FETCH_ROOM_FAILED,
    UPDATE_ROOM,
    UPDATE_ROOM_RECEIVED,
    UPDATE_ROOM_FAILED,
 } from '../actions/types';

 function saveRoomApi(data){
    let payload = data.payload;
    let url = api.api_path + api.version_path + api.room_path;
    let newPayload = {
        "name": payload.name,
        "room_type_id": payload.room_type_id,
        "availability": payload.availability,
        "image": "https://lorempixel.com/200/200/?34563", //hardcoding image url
    }

    return axios.post(url, newPayload);
}

function fetchRoomsApi(payload){
    let params = {};
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.rooms_path,
        params:params,
        crossdomain: true
    });
}

function* fetchRooms(action) {
    try {
        const response = yield call(fetchRoomsApi, action);
        yield put({
            type: ROOMS_RECEIVED,
            response
        });
    }
    catch(error) {
        yield put({ type: ROOMS_REQUEST_FAILED, error });
    }
}

function* saveRoom(action) {
    try {
        const response = yield call(saveRoomApi, action);
        yield put({ type: SAVE_ROOM_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: SAVE_FAILED, error });
    }
}

function* deleteRoom(action) {
    try {
        const response = yield call(deleteRoomApi, action);
        yield put({ type: DELETE_ROOM_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: DELETE_FAILED, error });
    }
}

function deleteRoomApi(payload){
    const { roomId } = payload;
    return axios({
      method: "delete",
      crossdomain: true,
      url: api.api_path + api.version_path + api.ROOMs_path + "/" + roomId,
    });
}

function fetchRoomApi(payload) {
    const { roomId } = payload;
    return axios({
        method: "get",
        crossdomain: true,
        url: api.api_path + api.version_path + api.room_path + "/" + roomId,
    })
}

function* fetchRoom(action) {
    try {
        const response = yield call(fetchRoomApi, action);
        yield put({ type: FETCH_ROOM_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_ROOM_FAILED, error });
    }
}

function updateRoomApi(data) {
    const { roomId, payload } = data;
    const url = api.api_path + api.version_path + api.room_path + "/" + roomId;

    let newPayload = {
        "name": payload.name,
        "room_type_id": payload.room_type_id,
        "image": "https://lorempixel.com/200/200/?34563", //hardcoding image url
    }

    return axios.put(url, newPayload);
}

function* updateRoom(action) {
    try {
        const response = yield call(updateRoomApi, action);
        yield put({ type: UPDATE_ROOM_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: UPDATE_ROOM_FAILED, error });
    }
}

export function* saveRoomSaga() {
    yield takeLatest(SAVE_ROOM, saveRoom)
}

export function* watchRoomsSaga() {
     yield takeLatest( FETCH_ROOMS , fetchRooms)
}

export function* watchDeleteRoomSaga() {
    yield takeLatest(DELETE_ROOM, deleteRoom)
}

export function* watchFetchRoomSaga() {
    yield takeLatest(FETCH_ROOM, fetchRoom)
}

export function* watchUpdateRoomSaga() {
    yield takeLatest(UPDATE_ROOM, updateRoom)
}
