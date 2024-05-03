const { register, isUsernameTaken, isPhoneNumberTaken } = require('../database/auth_db');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.post('/register', async (req, res) => {
    const { username, pin, phonenumber } = req.body;

    try {
        if (!username || !pin || !phonenumber) {
            return res.status(400).json({ error: 'Käyttäjänimi, pin-koodi ja puhelinnumero vaaditaan!' });
        }

        if (!isUsernameLengthOverFour(username)) {
            return res.status(400).json({ error: 'Käyttäjänimen tulee olla vähintään 4 merkkiä pitkä!' });
        }

        if (!ispin8Digits(pin)) {
            return res.status(400).json({ error: 'PIN-koodin tulee olla tarkalleen 8 merkkiä pitkä!' });
        }

        if (await checkUsername(username)) {
            return res.status(400).json({ error: 'Käyttäjänimi on jo käytössä!' });
        }

        if (await checkPhoneNumber(phonenumber)) {
            return res.status(400).json({ error: 'Puhelinnumero on jo käytössä!' });
        }

        if (!isPhoneNumberValid(phonenumber)) {
            return res.status(400).json({ error: 'Puhelinnumero on virheellinen!' });
        } 

        const passwordHash = await bcrypt.hash(pin, 10);
        const mobilepin = createMobilepin(phonenumber);

        console.log('Registering user', username);

        const result = await register(username, passwordHash, mobilepin, phonenumber);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Rekisteröinnissä tapahtui virhe.' });
    }
});

const checkUsername = async (username) => {
    const user = await isUsernameTaken(username);
    return !!user;
}

const checkPhoneNumber = async (phonenumber) => {   
    const user = await isPhoneNumberTaken(phonenumber);
    return !!user;
}

const isUsernameLengthOverFour = (username) => {
    return username.length >= 4;
}

const ispin8Digits = (pin) => {
    return pin.length === 8;
}

const isPhoneNumberValid = (phonenumber) => {
    const regex = /^\+358[ -]?(0)?[1-9]\d{2}[ -]?\d{4,}$/;
    return regex.test(phonenumber);
};

function createMobilepin(phonenumber) {
    const hash = crypto.createHash('sha256');
    hash.update(phonenumber);
    const hexDigest = hash.digest('hex');
    const eightDigitCode = hexDigest.slice(-8);
    return eightDigitCode;
}

module.exports = router;
