import { ASC, DESC } from "redux/actions";

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