import { ACCESS_TOKEN, IS_LOGGED_IN, REFRESH_TOKEN } from "configs/variables.config";
import Navigate from 'universal-navigate';

export const getAppTitle = () => {
    return process.env.REACT_APP_WEBSITE_NAME;
};

export const getAppDescription = () => {
    return process.env.REACT_APP_WEBSITE_DESCRIPTION;
};

export const getUserloggedInData = () => {
    if(localStorage.hasOwnProperty('userData')) {
        return JSON.parse(localStorage.getItem('userData'));
    } else {
        return null;
    }
};

export const parseJwt  = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const CheckUserExpired = (pageStatus) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return;
    const { exp } = parseJwt(token);
    if (exp * 1000 < Date.now()) {

        localStorage.removeItem('userData');
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(IS_LOGGED_IN);

        if(pageStatus != "public") {
            Navigate.push({
                url: '/login?expired=true',
                animated: true
            });
        }
    }
}

export function convertMiladiToShamsi(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return [jy + '/' + jm + '/' + jd];
}

export function ShowPrice(price, FA_Number = false) {
    price = price.replace(/\,/g, '');
    const objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
    while (objRegex.test(price)) {
        price = price.replace(objRegex, '$1,$2');
    }

    if(FA_Number) {
        const persian = {0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹'};
        const string = (price + '').split('');
        const count = string.length;
        let num;
        for (let i = 0; i <= count; i++) {
            num = string[i];
            if (persian[num]) {
                string[i] = persian[num];
            }
        }
        return string.join('');
    } else {
        return price;
    }
}

export function removeAllUserData() {
    localStorage.removeItem('userData');
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(IS_LOGGED_IN);
}

export const loadBasketState = () => {
    try {
        const basketState = localStorage.getItem('Basket');
        if (basketState === null) {
            return undefined;
        }
        return JSON.parse(basketState);
    } catch (err) {
        return undefined;
    }
}; 

export const saveBasketState = (state) => {
    try {
        const basketState = JSON.stringify(state);
        localStorage.setItem('Basket', basketState);
    } catch {
        // error
    }
};

export const loadUserData = () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const userInfo = {
            id: userData.id,
            role: userData.role,
            username: userData.username,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            country: userData.country,
            state: userData.state,
            city: userData.city,
            zip: userData.zip,
            createdAt: userData.createdAt,
            exp: userData.exp,
            iat: userData.iat,
            loggedIn: userData.loggedIn,
            token: userData.token,
        };

        if (userData === null) {
            return  userInfo = {
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
        }
        return userInfo;
    } catch (err) {
        return undefined;
    }
}

export function persianNumber(number) {
    const persian = {0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹'};
    const string = (number + '').split('');
    const count = string.length;
    let num;
    for (let i = 0; i <= count; i++) {
        num = string[i];
        if (persian[num]) {
            string[i] = persian[num];
        }
    }
    return string.join('');
}

export function englishNumber(number) {
    const persian = {"۰": '0', "۱": '1', "۲": '2', "۳": '3', "۴": '4', "۵": '5', "۶": '6', "۷": '7', "۸": '8', "۹": '9'};
    const string = (number + '').split('');
    const count = string.length;
    let num;
    for (let i = 0; i <= count; i++) {
        num = string[i];
        if (persian[num]) {
            string[i] = persian[num];
        }
    }
    return string.join('');
}

export function loadOrderState() {
    try {
        const orderState = localStorage.getItem('Order');
        if (orderState === null) {
            return undefined;
        }
        return JSON.parse(orderState);
    } catch (err) {
        return undefined;
    }
}

export function saveOrderState(state) {
    try {
        const orderState = JSON.stringify(state);
        localStorage.setItem('Order', orderState);
    } catch {
        // error
    }
}