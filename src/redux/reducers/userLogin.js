import { LOGIN_SUCCESS, USER_DATA } from "redux/actions";

const userInofo = {
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
};

export function userLogin(userInofoState = userInofo, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            if(action.payload){
                userInofoState = action.payload;
            } else {
                userInofoState = userInofo;
            }
            return userInofoState;
        }
        break;

        case USER_DATA:
            return userInofoState;
        break;

        default:
            return userInofoState;
        break;
    }
}