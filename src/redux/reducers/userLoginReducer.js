import { LOGIN_SUCCESS, USER_DATA, LOGOUT } from "redux/types";

const userInfo = {
    id: null,
    role: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",

    createdAt: null,
    exp: null,
    iat: null,
    loggedIn: false,
    token: "",
};

export function userLogin(userInofoState = userInfo, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: 
            return userInofoState = action.payload;
        break;

        case USER_DATA:
            return userInofoState;
        break;

        case LOGOUT:
            return userInofoState = userInfo;
        break;
        
        default:
            return userInofoState;
        break;
    }
}