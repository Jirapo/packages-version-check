const check = require('../lib/check');
const checkRegistry = require('../lib/checkRegistry');
const { join } = require('path');

const folder = join(__dirname, '..');
check({ folder }).then(r => console.log(r))

