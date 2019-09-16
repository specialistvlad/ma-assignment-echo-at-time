const request = require('request-promise-native');
const dayjs = require('dayjs');

let messageCounter = 0;

const options = {
  url: process.argv[2],
  method: 'POST',
  // form: { time: dayjs().add(messageCounter, 'sec'), message: `message id: ${messageCounter}` },
  // form: { time: 'asd' },
};
console.log(options);
request(options).then(() => console.log('zbs')).catch(e => console.log(e.stack));
