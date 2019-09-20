import { put, takeLatest, call } from 'redux-saga/effects';
import { default as axios } from '../api/axios-api.js';
import api from '../config/config.js';

import {
    SAVE_PRICELIST,
    SAVE_FAILED,
    SAVE_PRICELIST_RECEIVED,
    FETCH_PRICELISTS,
    PRICELISTS_RECEIVED,
    PRICELISTS_REQUEST_FAILED,
    DELETE_PRICELIST,
    DELETE_FAILED,
    DELETE_PRICELIST_RECEIVED,
    FETCH_PRICELIST,
    FETCH_PRICELIST_RECEIVED,
    FETCH_PRICELIST_FAILED,
    UPDATE_PRICELIST,
    UPDATE_PRICELIST_RECEIVED,
    UPDATE_PRICELIST_FAILED,
    ROOM_DETAILS_RECEIVED,
    ROOM_DETAILS_FAILED,
    FETCH_ROOM_DETAILS
 } from '../actions/types';

 function savePriceListApi(data) {
    let payload = data.payload;
    let url = api.api_path + api.version_path + api.priceList_path;
    let newPayload = {
        "price": payload.price,
        "room_type_id": payload.room_type_id
    }

    return axios.post(url, newPayload);
}

function fetchPriceListsApi(payload) {
    let params = {};
    return axios({
        method: "get",
        url: api.api_path + api.version_path + api.priceLists_path,
        params:params,
        crossdomain: true
    });
}

function* fetchPriceLists(action) {
    try {
        const response = yield call(fetchPriceListsApi, action);
        yield put({
            type: PRICELISTS_RECEIVED,
            response
        });
    }
    catch(error) {
        yield put({ type: PRICELISTS_REQUEST_FAILED, error });
    }
}

function* savePriceList(action) {
    try {
        const response = yield call(savePriceListApi, action);
        yield put({ type: SAVE_PRICELIST_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: SAVE_FAILED, error });
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

function* deletePriceList(action) {
    try {
        const response = yield call(deletePriceListApi, action);
        yield put({ type: DELETE_PRICELIST_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: DELETE_FAILED, error });
    }
}

function deletePriceListApi(payload){
    const { priceListId } = payload;
    return axios({
      method: "delete",
      crossdomain: true,
      url: api.api_path + api.version_path + api.priceList_path + "/" + priceListId,
    });
}

function fetchPriceListApi(payload) {
    const { priceListId } = payload;
    return axios({
        method: "get",
        crossdomain: true,
        url: api.api_path + api.version_path + api.priceList_path + "/" + priceListId,
    })
}

function* fetchPriceList(action) {
    try {
        const response = yield call(fetchPriceListApi, action);
        yield put({ type: FETCH_PRICELIST_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: FETCH_PRICELIST_FAILED, error });
    }
}

function updatePriceListApi(data) {
    const { priceListId, payload } = data;
    const url = api.api_path + api.version_path + api.priceList_path + "/" + priceListId;

    let newPayload = {
        "price": payload.price,
        "room_type_id": payload.room_type_id
    }

    return axios.put(url, newPayload);
}

function* updatePriceList(action) {
    try {
        const response = yield call(updatePriceListApi, action);
        yield put({ type: UPDATE_PRICELIST_RECEIVED, response });
    }
    catch(error) {
        yield put({ type: UPDATE_PRICELIST_FAILED, error });
    }
}

export function* savePriceListSaga() {
    yield takeLatest(SAVE_PRICELIST, savePriceList)
}

export function* watchPriceListsSaga() {
     yield takeLatest( FETCH_PRICELISTS , fetchPriceLists)
}

export function* watchDeletePriceListSaga() {
    yield takeLatest(DELETE_PRICELIST, deletePriceList)
}

export function* watchFetchPriceListSaga() {
    yield takeLatest(FETCH_PRICELIST, fetchPriceList)
}

export function* watchUpdatePriceListSaga() {
    yield takeLatest(UPDATE_PRICELIST, updatePriceList)
}
export function* watchRoomDetailsSaga() {
    yield takeLatest(FETCH_ROOM_DETAILS, fetchRoomDetails)
}

