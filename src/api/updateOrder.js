import { GET_ORDERS } from "configs/url.config";
import http from "services/http.service";

export async function updateOrder(orderId, data) {
    try {
        const response = await http.put(`${GET_ORDERS}/${orderId}`, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}
