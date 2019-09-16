const Redis = require('ioredis');
const createDebug = require('debug');

const pooler = require('./modules/pooler');
const webServer = require('./modules/webServer');
const { name } = require('../package');

const debug = createDebug(name);
const storage = new Redis();

webServer({ storage, debug });
pooler({ storage, debug });
