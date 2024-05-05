const pgPool = require('./pg_connection');

const sql = {
    VALIDATE: 'SELECT * FROM "account" WHERE "username" = $1 AND "phonenumber" = $2',
};

async function validateUserToPhonenumber(username, phonenumber) {
    let result = await pgPool.query(sql.VALIDATE, [username, phonenumber]);
    return result.rows[0];
}

module.exports = { validateUserToPhonenumber };