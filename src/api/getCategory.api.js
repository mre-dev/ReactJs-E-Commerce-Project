import { GET_CATEGORIES } from 'configs/url.config';
import http from 'services/http.service';

export async function GetCategory(id) {
    try {
        const response = await http.get(`${GET_CATEGORIES}/${id}`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}