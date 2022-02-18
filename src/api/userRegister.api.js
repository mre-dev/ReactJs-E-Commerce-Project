import { REGISTER } from 'configs/url.config';
import http from 'services/http.service';

export async function Register(data) {
    try {
        const response = await http.post(REGISTER, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}