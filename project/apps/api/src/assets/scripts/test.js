exports.handler = (context, event, callback) => {
  const sparedByThanos = Math.random() > 0.5;

  callback(null, {
    sparedByThanos,
    quote: 'You should have gone for the head*',
  });
};
