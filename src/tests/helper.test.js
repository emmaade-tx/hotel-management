import React from 'react';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import helper_factory from './factory/helperFactory';

const emptyContent = [];

import {
    convertDurationToMin,
    checkAdminAndManager,
    isLoggedIn,
    checkIfManager,
    checkIfAdmin,
    validateEmail
} from '../helpers/helper';

jest.mock('jwt-decode', () => {
    return jest.fn().mockImplementation(() => {
        return {userId: 1234};
    });
});

// declare messages

const mockroleId = '1';
const mockToken = '1234567890abcdefghij';

// TESTS

describe('Helpers.isLoggedIn', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('isLoggedIn should be false when no props are passed and localStorage is empty', () => {
        expect(isLoggedIn()).toBe(false);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for token and userId', () => {
        localStorage.setItem('token', '1234567890abcdefghijkl');
        localStorage.setItem('userId', '-9999');
        expect(isLoggedIn()).toBe(true);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for token only', () => {
        localStorage.setItem('token', '1234567890abcdefghijkl');
        expect(isLoggedIn()).toBe(false);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for userId only', () => {
        localStorage.setItem('userId', '-9999');
        expect(isLoggedIn()).toBe(false);
    });

});

describe('Helpers.convertDurationToMin', () => {

    it('convertDurationToMin returns "00:00" when passing a string', () => {
        expect(convertDurationToMin('word')).toBe('00:00');
    });

    it('convertDurationToMin returns "00:00" when passing a negative number', () => {
        expect(convertDurationToMin(-25)).toBe('00:00');
    });

    it('convertDurationToMin returns "0:30" when passing 30', () => {
        expect(convertDurationToMin(30)).toBe('0:30');
    });

    it('convertDurationToMin returns "1:00" when passing 60', () => {
        expect(convertDurationToMin(60)).toBe('1:00');
    });

    it('convertDurationToMin returns "10:00" when passing 600', () => {
        expect(convertDurationToMin(600)).toBe('10:00');
    });

    it('convertDurationToMin returns "10:30" when passing 630', () => {
        expect(convertDurationToMin(630)).toBe('10:30');
    });

    it('convertDurationToMin returns "1:00:00" when passing 3600', () => {
        expect(convertDurationToMin(3600)).toBe('1:00:00');
    });

    it('convertDurationToMin returns "1:01:30" when passing 3690', () => {
        expect(convertDurationToMin(3690)).toBe('1:01:30');
    });
});

describe('Helpers.checkAdminAndManager', () => {
    it('checkAdminAndManager to return true but false otherwise', () => {
        localStorage.setItem('roleId', '2');
        expect(checkAdminAndManager()).toBe(true);
    });

    it('checkAdminAndManager to return true but false otherwise', () => {
        localStorage.setItem('roleId', '3');
        expect(checkAdminAndManager()).toBe(true);
    });

    it('checkAdminAndManager to return true but false otherwise', () => {
        localStorage.setItem('roleId', '1');
        expect(checkAdminAndManager()).toBe(false);
    });

    it('checkIfManager to return true', () => {
        localStorage.setItem('roleId', '1');
        expect(checkIfManager()).toBe(false);
    });

    it('checkIfManager to return true', () => {
        localStorage.setItem('roleId', '2');
        expect(checkIfManager()).toBe(true);
    });

    it('checkIfManager to return true', () => {
        localStorage.setItem('roleId', '3');
        expect(checkIfManager()).toBe(false);
    });

    it('checkIfAdmin to return true', () => {
        localStorage.setItem('roleId', '1');
        expect(checkIfAdmin()).toBe(false);
    });

    it('checkIfAdmin to return true', () => {
        localStorage.setItem('roleId', '2');
        expect(checkIfAdmin()).toBe(false);
    });

    it('checkIfAdmin to return true', () => {
        localStorage.setItem('roleId', '3');
        expect(checkIfAdmin()).toBe(true);
    });
});

describe('Helpers.convertDurationToMin', () => {

    it('validateEmail should return false for invalid email', () => {
        expect(validateEmail('word')).toBe(false);
    });

    it('validateEmail should return false for invalid email', () => {
        expect(validateEmail('sample@y')).toBe(false);
    });

    it('validateEmail should true false for valid email', () => {
        expect(validateEmail('sample@y.com')).toBe(true);
    });
});

