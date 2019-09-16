const EchoQueue = require('../../src/Queue');

class QueueWithMockedVariables extends EchoQueue {
  constructor(opts, ...args) {
    super(
      {
        debug: () => {},
        ...opts
      },
      ...args
    );
  }

  _getRandomString() {
    return 'not random string generator';
  }

  _getCurrentTime() {
    return 3500;
  }
}

module.exports = QueueWithMockedVariables;
