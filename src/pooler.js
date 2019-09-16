const { CronJob } = require('cron');
const EchoQueue = require('./EchoQueue');

module.exports = ({ storage, debug }) => {
  const echoQueue = new EchoQueue({ storage, debug });

  return new CronJob('* * * * * *', echoQueue.echo.bind(echoQueue), null, true);
};
