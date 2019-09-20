import {
    CLEAR_NOTIFICATION,
    TOKEN_FAILED,
    SHOW_NOTIFICATION
 } from '../actions/types';

const initialState = {
    open: false,
    messageId: "", // this is a message id we use in en.json
    message: "", // this is a literal string that comes from response
    type: 'info'
  }

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues)
}

export default function notificationReducer(state = initialState, action) {
	let newState = state;
    switch (action.type) {
        case CLEAR_NOTIFICATION:
            newState = updateObject(state, {open: false, messageId: "", message: ""});
            return newState;
        case SHOW_NOTIFICATION:
            newState = updateObject(state, { open: true, messageId: "", type: 'success' });
            return newState;
        case TOKEN_FAILED:
            newState = updateObject(state, { open: true, messageId: "authentication failed", type: 'error'});
            return newState;
        default:
            return state;
    }
}
