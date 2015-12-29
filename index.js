'use strict';

const path = require('path');
const walk = require('./lib/walker');
const Group = require('./lib/group');
const output = require('./lib/output');

module.exports = {
  walk: walk,
  Group: Group,
  writeTheme: output.writeTheme,
  writeSingleFile: output.writeSingleFile,
  theme(name) {
    return path.join(__dirname, 'templates');
  }
};

