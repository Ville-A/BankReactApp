require('dotenv').config();
const { getPin, changePassword } = require('../database/auth_db');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { username, pin } = req.body;

        if (!username || !pin) {
            return res.status(400).json({ error: 'Käyttäjänimi ja PIN-koodi vaaditaan!' });
        }

        const storedPassword = await getPin(username);
        if (!storedPassword) {
            return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
        }

        const passwordMatch = await bcrypt.compare(pin, storedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Salasana tai käyttäjä on väärin' });
        }
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Kirjautuminen onnistui', jwtToken: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/validateToken', (req, res) => {
    try {
        const  { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            res.status(200).json({ valid: true });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/changePassword', async (req, res) => {
    try {
        const { username, newpin } = req.body;
        if (!username || !newpin ) {
            return res.status(400).json({ error: 'Käyttäjänimi, PIN-koodi tarvitaan' });
        }
        
        const hashedNewPin = await bcrypt.hash(newpin, 10);
        changePassword(username, hashedNewPin);
        res.status(200).json({ message: 'Salasana vaihdettu onnistuneesti' });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;