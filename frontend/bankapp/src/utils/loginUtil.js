import axios from "axios";
import { jwtToken } from "./jwtToken";

export function loginUser(username, pin) {
    return axios.post('/login', {username, pin})
    .then(response => {
        const token = response.data.jwtToken;
        if (token) {
            jwtToken.value = token;
            return true;
        } else {
            console.error("JWT token not found")
            return false
        }
    })
    .catch(error => {
        console.error("Login failed:", error.message)
        return false
    });
}