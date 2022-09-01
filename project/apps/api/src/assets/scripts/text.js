exports.handler = (context, event, callback) => {
  const twiml = new Twilio.twiml.MessagingResponse();
  twiml.message('I will be the response to your message!');
  return callback(null, twiml);
};
