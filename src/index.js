const createDebug = require('debug');
const Queue = require('./Queue');
const Cron = require('./Cron');
const server = require('./server');
const { name } = require('../package');

const debug = createDebug(name);

const queue = new Queue({ timeSeed, debug });
const cron = Cron(queue.pool.bind(queue));

server({ queue, debug });
