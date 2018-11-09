import axios from 'axios';
import "babel-polyfill";
import { buildUrl, getConfig } from '../helpers/UrlHelper';

const service = 'users/';

export async function loadMe(data) {
    return await axios.post(buildUrl(service, 'authenticate'), data)
        .then(response => response.data);
}

export async function createUser(data) {
    return await axios.post(buildUrl(service, ''), data)
        .then(response => response.data.data)
        .catch(error => console.error(error));
}

export async function removeUser(id, auth) {
    return await axios.delete(buildUrl(service, id), getConfig(auth))
        .then(response => id)
        .catch(error => console.error(error));
}

export async function loadUsers(query, auth) {
    return await axios.get(buildUrl(service, '', { query }), getConfig(auth))
        .then(response => response.data)
        .catch(error => console.error(error));
}
