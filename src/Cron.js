const CronJob = require('cron').CronJob;

module.exports = (task) => {
  return new CronJob('* * * * * *', task, null, true);
};
