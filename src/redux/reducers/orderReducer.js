import { CREATE_ORDER, GET_ORDERS, DELETE_ORDER } from "redux/types";

export function orderReducer(state = [], action) {
    switch (action.type) {
        case CREATE_ORDER:
            return state = action.payload;
        case GET_ORDERS:
            return state;
        case DELETE_ORDER:
            return state = [];
        default:
            return state;
    }
}