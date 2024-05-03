require('dotenv').config();
const { getPin } = require('../database/auth_db');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const pin = req.body.pin;

    try {
        if (!username || !pin) {
            return res.status(400).json({ error: 'Käyttäjänimi ja PIN-koodi vaaditaan!' });
        }

        const storedPassword = await getPin(username);

        if (storedPassword) {
            const passwordMatch = await bcrypt.compare(pin, storedPassword);
            if (passwordMatch) {
                const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
                res.status(200).json({ message: 'Kirjautuminen onnistui', jwtToken: token },);
            } else {
                res.status(401).json({ error: 'Käyttäjä ei sallittu' });
            }
        } else {
            res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;