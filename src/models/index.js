const mongoose = require('mongoose');
const winston = require('winston');
mongoose.Promise = global.Promise;
const config = require('../config');


const DBURI = config.db;

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
};

mongoose.connect(DBURI, options);
if (config.env === 'development') {
    mongoose.set('debug', true);
}

mongoose.connection.on('connected', () => {
    winston.info('Connected to ', DBURI);
});

mongoose.connection.on('error', (err) => {
    winston.info('ERRROR CONNECTING', {
        err
    });
});

mongoose.connection.on('disconnected', () => {
    winston.info('Disconnected From ', DBURI);
});

require('./menu');