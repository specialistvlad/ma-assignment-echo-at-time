const express = require('express');
const { urlencoded } = require('body-parser');
const dayjs = require('dayjs');

const Queue = require('../classes/Queue');

module.exports = ({ storage, debug }) => {
  const queue = new Queue({ storage, debug });
  const app = express();
  app.use(urlencoded({ extended: false }));

  app.post('/echoAtTime', async (req, res) => {
    const { message, time: sourceTime } = req.body;
    const dateTime = dayjs(sourceTime);
    debug(`echoAtTime - message:"${message}" at time:"${dateTime}"`);
    if (!sourceTime || !dateTime.isValid()) {
      res.status = 400;
      res.send(`Time format is not supported. Try to use for example ${dayjs().toISOString()}`);
      return;
    }

    if (!message) {
      res.status = 400;
      res.send("Message can't be empty");
      return;
    }

    await queue.add(dateTime.valueOf(), message);
    res.sendStatus(200);
  });

  app.get('/seed', async (req, res) => {
    await Promise.all(
      [
        [4000, 'Message 3'],
        [6000, 'Message 5'],
        [1000, 'Message 1'],
        [5001, 'Message 4'],
        [5002, 'Message 4_2'],
        [3000, 'Message 2']
      ].map(([offset, message]) => queue.add(dayjs().valueOf() + offset, message))
    );

    res.sendStatus(200);
  });

  app.listen(3000, () => console.log(`Example app listening!`));
  return app;
};
