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

export async function GetProduct(id) {
    try {
        const response = await http.get(GET_PRODUCTS + '/' + id);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function AddProduct(data) {
    try {
        const response = await http.post(GET_PRODUCTS, data);
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

export async function UpdateProduct(id, data) {
    try {
        const response = await http.put(GET_PRODUCTS + '/' + id, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function FilterProductByCategories(categorieId) {
    try {
        const response = await http.get(GET_PRODUCTS + '?category-id=' + categorieId);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function ProductsPagination(categorieId, page, pageSize, sortDate) {
    try {
        if(categorieId == "all") {
            const response = await http.get(GET_PRODUCTS + '?_page=' + page + '&_limit=' + pageSize + "&_sort=createdAt&_order=" + sortDate);
            return response;
        } else {
            const response = await http.get(GET_PRODUCTS + '?category-id=' + categorieId + '&_page=' + page + '&_limit=' + pageSize + "&_sort=createdAt&_order=" + sortDate);
            return response;
        }
    } catch (e) {
        return Promise.reject(e);
    }
}