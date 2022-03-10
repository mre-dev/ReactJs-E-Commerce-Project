import { ShoppingReducer } from "./shoppingReducer";
import { combineReducers } from "redux";
import { loadBasketState, loadOrderState, loadUserData } from 'utils/functions.util';
import { productSort } from "./productSortReducer";
import { userLogin } from "./userLoginReducer";
import { orderReducer } from "./orderReducer";

export const allReducer = combineReducers({
    userLogin( state = loadUserData(), action ) {
        return userLogin( state, action );
    },
    productSort( state = "desc", action ) {
        return productSort( state, action );
    },
    shoppingReducer( state = loadBasketState(), action ) {
        return ShoppingReducer( state, action );
    },
    orderReducer( state = loadOrderState(), action ) {
        return orderReducer( state, action );
    }
});