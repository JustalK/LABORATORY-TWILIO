require('dotenv').config();
import * as express from 'express';

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/send-sms', async (req, res, next) => {
  const { number } = req.body;

  const message = await client.messages.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: process.env.TWILIO_NUMBER,
    to: number || process.env.MY_NUMBER,
  });

  res.json(number);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
