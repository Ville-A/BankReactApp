const express = require('express');
const router = express.Router();
const { sendSMS, verifySMS } = require('../database/sinch_sms');

router.post('/sendSMS', async (req, res) => {
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const response = await sendSMS(phonenumber);
        console.log('SMS sent successfully:', response);
        res.json({ message: 'SMS sent successfully', response });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
});

router.post('/verifySMS', async (req, res) => {
    const { phonenumber, CODE } = req.body;

    if (!phonenumber || !CODE) {
        return res.status(400).json({ error: 'Phone number and code are required' });
    }

    try {
        const response = await verifySMS(phonenumber, CODE);
        console.log('SMS verified successfully:', response);
        res.json({ message: 'SMS verified successfully', response });
    } catch (error) {
        console.error('Error verifying SMS:', error);
        res.status(500).json({ error: 'Failed to verify SMS' });
    }
});


module.exports = router;