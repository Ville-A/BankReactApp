const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO "account" (username, pin, mobilepin, phonenumber) VALUES ($1, $2, $3, $4)',
    IS_PHONE_NUMBER_TAKEN: 'SELECT * FROM "account" WHERE phonenumber = $1',
    IS_USERNAME_TAKEN: 'SELECT * FROM "account" WHERE username = $1',
    GET_PIN: 'SELECT "pin" FROM "account" WHERE username = $1'
};

async function register(username, passwordHash, mobilepin, phonenumber) {
    let result = await pgPool.query(sql.REGISTER, [username, passwordHash, mobilepin, phonenumber]);
    return result.rows[0];
}

async function isUsernameTaken(username) {
    let result = await pgPool.query(sql.IS_USERNAME_TAKEN, [username]);
    return result.rows[0];
}

async function isPhoneNumberTaken(phonenumber) {
    let result = await pgPool.query(sql.IS_PHONE_NUMBER_TAKEN, [phonenumber]);
    return result.rows[0];
}

async function getPin(username) {
    let result = await pgPool.query(sql.GET_PIN, [username]);
    if (result.rows.length > 0) {
        return result.rows[0].pin;
    } else {
        return null;
    }
}

module.exports = { register, isUsernameTaken, isPhoneNumberTaken, getPin };