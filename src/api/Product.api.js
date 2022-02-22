import { GET_PRODUCTS } from 'configs/url.config';
import http from 'services/http.service';

export async function GetProducts() {
    try {
        const response = await http.get(GET_PRODUCTS);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function DeleteProducts(id) {
    try {
        const response = await http.delete(GET_PRODUCTS + '/' + id);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}