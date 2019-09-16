const EchoQueue = require('./EchoQueue');

describe('EchoQueue', () => {
  it('_parseMessage', async () => {
    const echoQueue = new EchoQueue({ debug: () => {} });
    expect(echoQueue._parseMessage('123:sdf:kjashdkasd')).toBe('sdf:kjashdkasd');
  });
});
