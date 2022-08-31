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

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

const crypto = require('crypto');

router.post('/service', async (req, res) => {
  const { name } = req.body;

  const service = await client.serverless.v1.services.create({
    includeCredentials: true,
    uniqueName: crypto.randomBytes(20).toString('hex'),
    friendlyName: name,
  });

  res.json(service);
});

router.get('/service', async (req, res) => {
  const services = await client.serverless.v1.services.list({ limit: 20 });
  res.json(services);
});

router.delete('/service', async (req, res) => {
  const { sid } = req.body;
  await client.serverless.v1.services(sid).remove();
  res.json(true);
});

router.post('/environment', async (req, res) => {
  const { sid, name } = req.body;

  const environment = await client.serverless.v1
    .services(sid)
    .environments.create({
      domainSuffix: name,
      uniqueName: name,
    });

  res.json(environment);
});

router.post('/function', async (req, res) => {
  const { sid, name } = req.body;

  const fc = await client.serverless.v1
    .services(sid)
    .functions.create({ friendlyName: name });

  res.json(fc);
});

router.get('/functions/:sid', async (req, res) => {
  const { sid } = req.params;
  const functions = await client.serverless.v1
    .services(sid)
    .functions.list({ limit: 20 });
  res.json(functions);
});

router.post('/upload', async (req, res) => {
  const { sid, fid } = req.body;

  const serviceUrl = `https://serverless-upload.twilio.com/v1/Services/${sid}`;
  const uploadUrl = `${serviceUrl}/Functions/${fid}/Versions`;

  const form = new FormData();
  form.append('Path', '/thanos');
  form.append('Visibility', 'public');
  form.append(
    'Content',
    fs.createReadStream(__dirname + '/assets/scripts/test.js'),
    {
      contentType: 'application/javascript',
    }
  );

  await axios.post(uploadUrl, form, {
    auth: {
      username: accountSid,
      password: authToken,
    },
    headers: form.getHeaders(),
  });

  res.json(true);
});

module.exports = router;
