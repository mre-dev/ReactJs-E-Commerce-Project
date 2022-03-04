import http from "services/http.service";
const KEY = 'GGL22h1W5EMPjdJRGzXsfFcC3xZvtwaw';

export async function GetMapByLatLng(lat, lng) {
    try {
        const response = await http.get(`https://www.mapquestapi.com/staticmap/v5/map?key=${KEY}&center=${lat},${lng}&size=@2x`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}