import { ASC, DESC, LOGIN_SUCCESS, USER_DATA } from "./actions";

export const setUserDataWhenLogin = (userData) => {
    return {
      type: LOGIN_SUCCESS,
      payload: userData
    };
};

export const getUserDataWhenLogin = () => {
    return {
      type: USER_DATA,
    };
};

export const sortByDesc = () => {
    return {
      type: DESC,
    };
};

export const sortByAsc = () => {
    return {
      type: ASC,
    };
};