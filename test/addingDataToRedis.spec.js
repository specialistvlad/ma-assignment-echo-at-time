const debug = require('debug')('');
const FakeRedis = require('./FakeRedis');
const EchoQueue = require('../src/Queue');

describe('adding data', () => {
  it('check positive flow of quering to redis', async () => {
    const dataSet = [
      [4000, 'Message 3'],
      [6000, 'Message 5'],
      [1000, 'Message 1'],
      [5001, 'Message 4'],
      [5002, 'Message 4_2'],
      [3000, 'Message 2']
    ];

    const storage = new FakeRedis();
    const echoQueue = new EchoQueue({ storage, debug });
    await Promise.all(dataSet.map(item => echoQueue.add(...item)));
    expect(storage.history).toMatchSnapshot();
  });
});
