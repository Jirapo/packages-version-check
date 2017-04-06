const check = require('../lib/check');
const { join, resolve } = require('path');

const folder = join(__dirname, '..');

check({
  folder
}).then(info => {
  console.log(info);
});