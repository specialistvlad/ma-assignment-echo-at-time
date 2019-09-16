const Redis = require('ioredis');
const createDebug = require('debug');
const pooler = require('./pooler');
const server = require('./server');
const { name } = require('../package');

const debug = createDebug(name);
const storage = new Redis();

server({ storage, debug });
pooler({ storage, debug });
