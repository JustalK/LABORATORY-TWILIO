require('dotenv').config();
import * as express from 'express';

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/send-sms', function (req, res, next) {
  const { number } = req.body;

  client.messages
    .create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+15626675225',
      to: process.env.MY_NUMBER,
    })
    .then((message) => console.log(message.sid));

  res.json(number);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
