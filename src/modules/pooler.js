const { CronJob } = require('cron');
const EchoQueue = require('../classes/EchoQueue');

module.exports = ({ storage, debug }) => {
  const echoQueue = new EchoQueue({ storage, debug });

  return new CronJob('* * * * * *', echoQueue.echo, null, true);
};
