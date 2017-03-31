const co = require('co');
const any = require('co-any');
const request = require('./request');

const defaultRegistryUrls = [
  'http://registry.npm.alibaba-inc.com',
  'https://registry.npm.taobao.org',
  'https://registry.npmjs.org'
];

module.exports = () => co(function* () {
  const { _key } = yield any(defaultRegistryUrls.map(url => request(`${url}/co/latest`)));

  return defaultRegistryUrls[_key];
});
