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

router.get('/history', async (_req, res) => {
  const messages = await client.messages.list({ limit: 20 });
  res.json(messages);
});

router.get('/history/:sid', async (req, res) => {
  const { sid } = req.params;
  const message = await client.messages(sid).fetch();
  res.json(message);
});

module.exports = router;
