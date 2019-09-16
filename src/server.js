const express = require('express');
const { urlencoded } = require('body-parser');
const dayjs = require('dayjs');

module.exports = ({ queue, debug}) => {
  const app = express();
  app.use(urlencoded({ extended: false }));

  app.post('/echoAtTime', (req, res) => {
    const { message, time: sourceTime } = req.body;
    const dateTime = dayjs(sourceTime);
    debug(`echoAtTime - message:"${message}" at time:"${dateTime}"`)
    if (!sourceTime || !dateTime.isValid()) {
      res.status = 400;
      res.send(`Time format is not supported. Try to use for example ${dayjs().toISOString()}`);
      return;
    }

    if (!message) {
      res.status = 400;
      res.send('Message can\'t be empty');
      return;
    }

    queue.add(dateTime.valueOf(), message);
    res.sendStatus(200);
  });

  app.get('/seed', (req, res) => {
    queue.seed();
    res.sendStatus(200);
  });

  app.listen(3000, () => console.log(`Example app listening!`));
  return app;
}
