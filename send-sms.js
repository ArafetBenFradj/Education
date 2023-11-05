const twilio = require('twilio');
const client = twilio('ACf389ed8652702a2746d5b983680959eb', '1a9f30a609db3b6d56f253463b6966ff');

client.messages.create({
  body: 'message to twilio ',
  from: '+16562162928',
  to: '+21628267590'
}).then(message => console.log(message.sid));