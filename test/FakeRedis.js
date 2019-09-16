module.exports = class FakeRedis {
  constructor() {
    this.list = [];
  }

  async zadd(score, ...args) {
    this.list.push({
      command: 'zadd',
      args
    });

    return this;
  }

  get history() {
    return this.list;
  }
};
