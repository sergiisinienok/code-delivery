'use strict';

const moment = require('moment');

module.exports.timestamp = () => moment().utc().format();
