const { CronJob } = require('cron');

module.exports = task => {
  return new CronJob('* * * * * *', task, null, true);
};
