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
