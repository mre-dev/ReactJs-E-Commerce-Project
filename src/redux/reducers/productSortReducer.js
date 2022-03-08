import { ASC, DESC } from "redux/types";

export function productSort(state = "desc", action) {
    switch (action.type) {
        case DESC:
            return state = DESC;
        case ASC:
            return state = ASC;
        default:
            return state;
    }
}