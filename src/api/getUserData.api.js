import { REGISTER } from "configs/url.config";
import http from "services/http.service";

export async function GetUserData(id) {
    try {
        const response = await http.get(REGISTER + '/' + id);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function GetUserFullName(id) {
    try {
        const response = await http.get(REGISTER + '/' + id);
        return response.data.firstName + " " + response.data.lastName;
    } catch (e) {
        return Promise.reject(e);
    }
}