const FakeRedis = require('./utils/FakeRedis');
const EchoQueue = require('./utils/QueueWithMockedVariables');

describe('shiftingDataFromRedis', () => {
  it('check positive flow of quering to redis', async () => {
    const mockRedisResponse = [
      [
        null,
        [
          '82f2bc06d2fe28ca2bf0:Message 1',
          '216427f50da68fcea198:Message 2',
          'f01aefe1bf6e284a742e:Message 3',
          'cfbcd4ab8b4d38b28c4b:Message 4',
          'cf761d0bf423e1e5a37f:Message 4_2',
          '0587cb69d23ce9387595:Message 5'
        ]
      ],
      [null, 6]
    ];

    const storage = new FakeRedis({ execReturns: mockRedisResponse });
    const echoQueue = new EchoQueue({ storage });
    const result = await echoQueue.shift();
    expect(result).toMatchSnapshot();
    expect(storage.history).toMatchSnapshot();
  });
});
