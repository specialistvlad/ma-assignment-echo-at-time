const { autobind } = require('core-decorators');
const Queue = require('./Queue');

class EchoQueue extends Queue {
  _parseMessage(message) {
    return message
      .split(':')
      .slice(1)
      .join(':');
  }

  _print(...args) {
    return console.log(...args);
  }

  async echo() {
    (await this.shift()).map(item => this._print(this._parseMessage(item)));
  }
}

autobind()(EchoQueue);
module.exports = EchoQueue;
