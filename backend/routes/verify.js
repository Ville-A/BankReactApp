require('dotenv').config();
const express = require('express');
const { validateUserToPhonenumber } = require('../database/verify_db');
const router = express.Router();

router.post('/verify', async (req, res) => {
    try {
        const { username, phonenumber } = req.body;

        if (!username || !phonenumber) {
            return res.status(400).json({ error: 'Käyttäjänimi ja puhelinnumero vaaditaan!' });
        }

        const userExists = await validateUserToPhonenumber(username, phonenumber);
        if (!userExists) {
            return res.status(404).json({ valid: false, error: 'Käyttäjää ei löytynyt' });
            
        }

        res.status(200).json({ valid: true, message: 'Käyttäjä löytyi' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;