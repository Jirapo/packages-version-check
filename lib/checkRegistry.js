const co = require('co');
const any = require('co-any');
const request = require('./request');

const defaultRegistryUrls = [
  'https://registry.npm.taobao.org',
  'http://registry.npm.alibaba-inc.com',
  'https://registry.npmjs.org'
];

module.exports = function() {
  const args = [].slice.call(arguments);
  return co(function* () {
    if (args.length > 0) {
      const { err } = yield request(`${args[0]}/co/latest`);

      if (!err) {
        return args[0];
      }
    } 

    const { _key } = yield any(defaultRegistryUrls.map(url => request(`${url}/co/latest`)));
    return defaultRegistryUrls[_key];

  });
};
