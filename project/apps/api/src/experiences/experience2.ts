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

router.post('/create-service', async (req, res) => {
  const { uniqueName, friendlyName } = req.body;

  client.serverless.v1.services
    .create({
      includeCredentials: true,
      uniqueName: uniqueName || 'demo2',
      friendlyName: friendlyName || 'testing2',
    })
    .then((service) => console.log(service.sid));

  res.json(true);
});

router.get('/service', async (req, res) => {
  const { uniqueName, friendlyName } = req.body;

  const services = await client.serverless.v1.services.list({ limit: 20 });

  res.json(services);
});

router.post('/create-environment', async (req, res) => {
  const { uniqueName, friendlyName } = req.body;

  client.serverless.v1
    .services('ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    .environments.create({
      domainSuffix: 'dev',
      uniqueName: 'dev-environment',
    })
    .then((environment) => console.log(environment.sid));

  res.json(true);
});

router.post('/create-function', async (req, res) => {
  const { uniqueName, friendlyName } = req.body;

  client.serverless.v1
    .services('ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    .functions.create({ friendlyName: 'firstfunc' })
    .then((function_) => console.log(function_.sid));

  res.json(true);
});

module.exports = router;
