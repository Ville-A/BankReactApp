const axios = require('axios');
require('dotenv').config();

const APPLICATION_KEY = process.env.APPLICATION_KEY;
const APPLICATION_SECRET = process.env.APPLICATION_SECRET;
const SINCH_URL = "https://verification.api.sinch.com/verification/v1/verifications";

function sendSMS(phonenumber) {
    return new Promise((resolve, reject) => {
        const payload = {
            identity: { type: 'number', endpoint: phonenumber },
            method: 'sms'
        };

        const basicAuthentication = `${APPLICATION_KEY}:${APPLICATION_SECRET}`;
        const headers = {
            'Authorization': 'Basic ' + Buffer.from(basicAuthentication).toString('base64'),
            'Content-Type': 'application/json; charset=utf-8'
        };

        axios.post(SINCH_URL, payload, { headers })
            .then(response => {
                resolve(response.data);
                console.log('SMS sent successfully:', response.data);
            })
            .catch(error => {
                reject(error.response.data);
        });
    });
}

function verifySMS(phonenumber, CODE) {
    return new Promise((resolve, reject) => {
        const basicAuthentication = `${APPLICATION_KEY}:${APPLICATION_SECRET}`;
        const base64Credentials = Buffer.from(basicAuthentication).toString('base64');
        const url = `https://verification.api.sinch.com/verification/v1/verifications/number/${phonenumber}`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Credentials}`
        };

        const payload = {
            method: 'sms',
            sms: {
                code: CODE
            }
        };

        axios.put(url, payload, { headers })
            .then(response => {
                console.log('SMS verified successfully:', response.data);
                resolve(response.data);
            })
            .catch(error => {
                console.error('Error verifying SMS:', error.response.data);
                reject(error.response.data);
            });
    });
}

module.exports = { sendSMS, verifySMS };