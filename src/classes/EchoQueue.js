const Queue = require('./Queue');

module.exports = class EchoQueue extends Queue {
  _parseMessage(message) {
    return message
      .split(':')
      .slice(1)
      .join('');
  }

  _print(...args) {
    return console.log(...args);
  }

  async echo() {
    (await this.shift()).map(item => this._print(this._parseMessage(item)));
  }
};
