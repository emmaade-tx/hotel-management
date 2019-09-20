import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import 'moment-timezone';
import {
    DEFAULT_DATE_FORMAT,
} from '../constants/constants';

export function isLoggedIn (props) {
    let token;
    let userId;

    token = localStorage.getItem('token');
    userId = localStorage.getItem('userId');

    return !!(userId && token);
}

export function checkIfAdmin () {
    const roleId = localStorage.getItem('roleId');
    return roleId == 3 ? true : false;
}

export function checkIfManager () {
    const roleId = localStorage.getItem('roleId');
    return roleId == 2 ? true : false;
}
export function checkAdminAndManager () {
    return !!(checkIfAdmin() || checkIfManager());
}

export function renderModifiedTime (timestamp) {
    const objectTimestamp = moment.utc(timestamp);
    const currentTimestamp = moment.utc();

    if (currentTimestamp.diff(objectTimestamp, 'hours') < 24) {
        return moment
            .utc(timestamp)
            .local()
            .fromNow();
    } else {
        return moment
            .utc(timestamp)
            .local()
            .format(DEFAULT_DATE_FORMAT);
    }
}

export function formatDate (timestamp) {
    return moment
        .utc(timestamp)
        .local()
        .format(DEFAULT_DATE_FORMAT);
}

export function convertDurationToMin (duration) {
    if (!isNaN(duration) && duration > 0) {
        const hours = Math.floor(duration / 3600);
        const time = duration - hours * 3600;
        const minutes = Math.floor(time / 60);
        const seconds = '0' + (time % 60);
        if (hours === 0) {
            return minutes.toString() + ':' + seconds.substr(-2);
        } else {
            return (
                hours.toString() +
                ':' +
                ('0' + minutes.toString()).substr(-2) +
                ':' +
                seconds.substr(-2)
            );
        }
    } else {
        return '00:00';
    }
}

export function getRoomTypeAndPriceEdit (roomDetails, roomId) {
    return  _.filter(roomDetails, (roomDetail) => {
         if (roomDetail.id === roomId) {
            roomDetail.display =  roomDetail.room_type.name + " " + roomDetail.name + " for $" + roomDetail.room_type.price_list.price;

            return roomDetail;
         }
    });
}

export function formatPriceLists (priceLists) {
    return priceLists.map(priceList => {
        priceList.name = priceList.room_type.name;

        return priceList;
    })
}

export function getSelectedRoomType (roomTypes, roomTypeId) {
    return  _.filter(roomTypes, (roomType) => {
        if (roomType.id === roomTypeId) {
            return roomType;
        }
    });
}

export function getRoomTypeAndPrice (roomDetails) {
    return roomDetails.map(roomDetail => {
        roomDetail.display =  roomDetail.room_type.name + " " + roomDetail.name + " for $" + roomDetail.room_type.price_list.price;

        return roomDetail;
    })
}

export function formatBookings (allBookings) {
    if (allBookings.length > 0) {
        return allBookings.map(allBooking => {
            allBooking.title = allBooking.full_name;
            allBooking.start = formatDate(allBooking.start_date);
            allBooking.end = formatDate(allBooking.end_date);
            allBooking.allDay = true;
            allBooking.desc = allBooking.roomType.name + ' ' + allBooking.room.name;

            return allBooking;
        })
    }
    return [];
}

export function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

