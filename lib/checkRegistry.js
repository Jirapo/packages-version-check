const co = require('co');
const any = require('co-any');
const request = require('./request');

const defaultRegistryUrls = [
  'http://registry.npm.alibaba-inc.com',
  'https://registry.npm.taobao.org',
  'https://registry.npmjs.org'
];

// module.exports = () => co(function* () {
module.exports = () => co(function* () {
  const { _key } = yield any([
    request('http://registry.npm.alibaba-inc.com/co/latest'),
    request('https://registry.npm.taobao.org/co/latest'),
    request('https://registry.npmjs.org/co/latest'),
  ]);

  return defaultRegistryUrls[_key];
});
