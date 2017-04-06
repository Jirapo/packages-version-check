const check = require('../lib/check');
const { join, resolve } = require('path');

const folder = join(__dirname, '..');

check({
  folder,
  registry: 'https://registry.npm.taobao.org',
}).then(info => {
  console.log(info);
});