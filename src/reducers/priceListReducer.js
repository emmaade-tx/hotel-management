import {
    SAVE_PRICELIST,
    SAVE_FAILED,
    SAVE_PRICELIST_RECEIVED,
    CLEAR_NOTIFICATION,
    FETCH_PRICELISTS,
    PRICELISTS_RECEIVED,
    FETCH_PRICELIST_FAILED,
    PRICELISTS_REQUEST_FAILED,
    DELETE_PRICELIST_RECEIVED,
    FETCH_PRICELIST_RECEIVED,
    UPDATE_PRICELIST_RECEIVED,
    ROOM_DETAILS_RECEIVED,
    ROOM_DETAILS_FAILED,
} from '../actions/types';
import { TABLE_LOAD_SIZE } from '../constants/constants'

const initialState = {
    hasError: false,
    hasSaved: false,
    isLoading: true,
    isSaving: false,
    activePriceList: null,
    allPriceLists: [],
    allRoomDetails: [],
    totalRecords: 0
}

export default function priceListReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_PRICELIST_RECEIVED:
            newState = Object.assign({}, state, { activePriceList: action.response.data });
            return newState;
        case SAVE_PRICELIST:
            newState = Object.assign({}, state, { isSaving:  true });
            return newState;

        case SAVE_FAILED:
            newState = Object.assign({}, state, { isSaving:  false, });
            return newState;

        case SAVE_PRICELIST_RECEIVED:
        case UPDATE_PRICELIST_RECEIVED:
            newState = Object.assign({}, state, { hasSaved: true, isSaving:  false, activePriceList: action.response.data });
            return newState;

        case FETCH_PRICELISTS:
            newState = Object.assign({}, state, { isLoading:  true, hasError: false});
            return newState;

        case PRICELISTS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                totalRecords: action.response.data.length,
                allPriceLists:  action.response.data,
            });

            return newState;

        case ROOM_DETAILS_RECEIVED:
            newState = Object.assign({}, state, { isLoading: false,
                hasError: false,
                totalRecords: action.response.data.length,
                allRoomDetails:  action.response ? action.response.data : []
            });
            return newState;

        case ROOM_DETAILS_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case PRICELISTS_REQUEST_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true });
            return newState;

        case FETCH_PRICELIST_FAILED:
            newState = Object.assign({}, state, { isLoading:  false, hasError: true});
            return newState;
        case DELETE_PRICELIST_RECEIVED:
            newState = Object.assign({}, state, { allPriceLists: []});
            return newState;
        default:
            return state;
    }
}
