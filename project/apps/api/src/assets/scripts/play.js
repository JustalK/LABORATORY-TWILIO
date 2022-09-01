exports.handler = (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const city = event.FromCity;
  const number = event.From;
  twiml.say({ voice: 'alice' }, `Never gonna give you up, ${city || number}`);
  twiml.play('https://demo.twilio.com/docs/classic.mp3');
  return callback(null, twiml);
};
