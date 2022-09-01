require('dotenv').config();
import * as express from 'express';

const app = express();
app.use(express.json());

app.use('/', require('./experiences/experience1'));
app.use('/experience2', require('./experiences/experience2'));
app.use('/experience3', require('./experiences/experience3'));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
