import { ADD_NEWSLETTER } from "configs/url.config";
import http from "services/http.service";

export async function AddNewsletter(data) {
    try {
        const response = await http.post(ADD_NEWSLETTER, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}