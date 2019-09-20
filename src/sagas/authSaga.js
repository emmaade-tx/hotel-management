import { put, takeLatest, call } from 'redux-saga/effects';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import api from '../config/config.js';

import {
    FETCH_TOKEN,
    TOKEN,
    TOKEN_FAILED,
    SET_USER_ID,
    REGISTER_SUCCESSFUL,
    REGISTER_FAILED,
    REGISTER_USER
 } from '../actions/types';

 function fetchAuthenticationApi(data) {
    let url = api.api_path + api.version_path + "/login";
    let credentials = {
        "email": data.payload.email,
        "password": data.payload.password
    }

    return axios.post(url, credentials);
}

function* getAndSetToken(action) {
    try {
        const response = yield call(fetchAuthenticationApi, action);
        const token = response.data.token
        let decoded = jwtDecode(token);
        let roleId = decoded.role_id;
        let userId = decoded.user_id;

        localStorage.setItem("userId", userId);
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("token", token);
        yield put({ type: SET_USER_ID, userId });
        yield put({ type: TOKEN, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: TOKEN_FAILED, error });
    }
}

function registerUserApi(data) {
    let url = api.api_path + api.version_path + "/register";
    let credentials = {
        "name": data.payload.name,
        "email": data.payload.email,
        "password": data.payload.password
    }

    return axios.post(url, credentials);
}

function* registerUser(action) {
    try {
        const response = yield call(registerUserApi, action);

        yield put({ type: REGISTER_SUCCESSFUL, response });
    }
    catch(error) {
        console.error(error)
        yield put({ type: REGISTER_FAILED, error });
    }
}

export function* getTokenSaga() {
    yield takeLatest(FETCH_TOKEN, getAndSetToken)
}

export function* registerUserSaga() {
    yield takeLatest(REGISTER_USER, registerUser)
}
