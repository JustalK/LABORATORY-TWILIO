/**
 * The endpoint of the express app
 * @module routes/app
 */
export {};
('use strict');

const express = require('express');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.post('/send-sms', async (req, res) => {
  const { number } = req.body;

  const message = await client.messages.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: process.env.TWILIO_NUMBER,
    to: number || process.env.MY_NUMBER,
  });

  res.json(message);
});

module.exports = router;
