import {effect , signal} from '@preact/signals-react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001';

export const jwtToken = signal(getSessionToken());

export const userInfo = signal(null);

function getSessionToken() {
    const token = sessionStorage.getItem('token');

    return token === null || token === 'null' ? '' : token;
}

effect(() => {
    sessionStorage.setItem('token', jwtToken.value);

    if(jwtToken.value.length !== 0){
        axios.get('/users/personal', {headers: {Authorization: "Bearer " + jwtToken.value}})
        .then(response => userInfo.value = response.data)
        .catch(error => console.log(error.message))
    } else {
        userInfo.value = null;
    }
});