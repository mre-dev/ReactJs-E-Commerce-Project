import { combineReducers } from "redux";
import { userLogin } from "./userLogin";
import { productSort } from "./productSort";

export const allReducer = combineReducers({
    userLogin,
    productSort
});