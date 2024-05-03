const { register, isUsernameTaken, isPhoneNumberTaken } = require('../database/auth_db');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const pin = req.body.pin;
    const phonenumber = req.body.phonenumber;
    console.log(req.body);
  
    try {
        if (!username || !pin || !phonenumber) {
            return res.status(400).json({ error: 'Käyttäjänimi, pin-koodi ja puhelinnumero vaaditaan!' });
        }

        if (await checkUsername(username)) {
            return res.status(400).json({ error: 'Käyttäjänimi on jo käytössä!' });
        }

        if (!isUsernameLengthOverFour(username)) {
            return res.status(400).json({ error: 'Käyttäjänimen tulee olla vähintään 4 merkkiä pitkä!' });
        }

        if (!ispin8Digits(pin)) {
            return res.status(400).json({ error: 'pin-koodin tulee olla 8 merkkiä pitkä!' });
        }

        if (await checkPhoneNumber(phonenumber)) {
            return res.status(400).json({ error: 'Puhelinnumero on jo käytössä!' });
        }

        if (await isPhoneNumberValid(phonenumber)) {
            return res.status(400).json({ error: 'Puhelinnumero on virheellinen!' });
        } 

        const passwordHash = await bcrypt.hash(pin, 10);
        const mobilepin = createMobilepin(phonenumber);

        console.log('Password hash', passwordHash);
       
        console.log('Mobilepin', mobilepin);

        console.log('Phonenumber', phonenumber);
    
        console.log('Registering user', username);

        const result = await register(username, passwordHash, mobilepin, phonenumber);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

const checkUsername = async (username) => {
    const user = await isUsernameTaken(username);
    return user ? true : false;
}

const checkPhoneNumber = async (phonenumber) => {   
    const user = await isPhoneNumberTaken(phonenumber);
    return user ? true : false;
}

const isUsernameLengthOverFour = (username) => {
    return username.length > 4;
}

const isPhoneNumberValid = (phonenumber) => {
    const regex = /^\+358[ -]?(0)?[1-9]\d{3}[ -]?\d{3,6}$/;
    return regex.test(phonenumber);
}

ispin8Digits = (pin) => {
    return pin.length === 8;
}

function createMobilepin(phonenumber) {
    const hash = crypto.createHash('sha256');
    hash.update(phonenumber);
    const hexDigest = hash.digest('hex');
    const hashInteger = BigInt('0x' + hexDigest);
    const eightDigitCode = String(hashInteger).slice(-8);
    return eightDigitCode.padStart(8, '0');
}

module.exports = router;