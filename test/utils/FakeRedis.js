module.exports = class FakeRedis {
  constructor({ execReturns } = {}) {
    this.list = [];
    this.zadd = this._push.bind(this, 'zadd');
    this.multi = this._pushSync.bind(this, 'multi');
    this.zrangebyscore = this._pushSync.bind(this, 'zrangebyscore');
    this.zremrangebyscore = this._pushSync.bind(this, 'zremrangebyscore');
    this.execReturns = execReturns;
  }

  async exec(...args) {
    this.list.push({
      command: 'exec',
      args
    });

    return this.execReturns;
  }

  async _push(command, ...args) {
    this.list.push({
      command,
      args
    });

    return this;
  }

  _pushSync(command, ...args) {
    this.list.push({
      command,
      args
    });

    return this;
  }

  get history() {
    return this.list;
  }
};
