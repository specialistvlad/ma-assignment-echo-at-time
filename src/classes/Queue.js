const dayjs = require('dayjs');
const cryptoRandomString = require('crypto-random-string');

module.exports = class Queue {
  constructor({ debug, storage }) {
    this.redis = storage;
    this.name = 'queue';
    this.debug = debug;
  }

  async add(score, message) {
    const member = `${this._getRandomString(20)}:${message}`;
    this.debug(`add: ${score}, "${member}"`);
    return this.redis.zadd(this.name, score, member);
  }

  _getRandomString(length) {
    return cryptoRandomString({ length });
  }

  _getCurrentTime() {
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
      ].map(([offset, message]) => this.add(this._getCurrentTime() + offset, message))
    );
  }

  async shift() {
    const time = this._getCurrentTime();
    const [[, result]] = await this.redis
      .multi()
      .zrangebyscore(this.name, 0, time)
      .zremrangebyscore(this.name, 0, time)
      .exec();

    return result;
  }
};
