import { GET_CATEGORIES } from 'configs/url.config';
import http from 'services/http.service';

export async function AddCategory(category) {
    try {
        const response = await http.post(`${GET_CATEGORIES}`, category);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function EditCategory(category) {
    try {
        const response = await http.put(`${GET_CATEGORIES}/${category.id}`, category);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}