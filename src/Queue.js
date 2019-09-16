const dayjs = require('dayjs');
const cryptoRandomString = require('crypto-random-string');

module.exports = class Queue {
  constructor({ debug, storage }) {
    this.redis = storage;
    this.name = 'queue';
    this.debug = debug;
  }

  async add(score, message) {
    const member = `${cryptoRandomString({ length: 20 })}:${message}`;
    this.debug(`add: ${score}, "${member}"`);
    return this.redis.zadd(this.name, score, member);
  }

  getCurrentTime() {
    return dayjs().valueOf();
  }

  async seed() {
    return Promise.all(
      [
        [4000, 'Message 3'],
        [6000, 'Message 5'],
        [1000, 'Message 1'],
        [5001, 'Message 4'],
        [5002, 'Message 4_2'],
        [3000, 'Message 2']
      ].map(([offset, message]) => this.add(this.getCurrentTime() + offset, message))
    );
  }

  async pool() {
    const [[, result]] = await this.redis
      .multi()
      .zrangebyscore(this.name, 0, this.getCurrentTime())
      .zremrangebyscore(this.name, 0, this.getCurrentTime())
      .exec();

    result.map(this.printMessage);
  }

  printMessage(message) {
    console.log(
      message
        .split(':')
        .slice(1)
        .join('')
    );
  }
};
