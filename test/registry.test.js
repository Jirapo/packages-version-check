const request = require('../lib/request');
const checkRegistry = require('../lib/checkRegistry');
const assert = require('power-assert');

describe('checkRegistry 异步测试', function() {
  it('checkRegistry应该返回一个string', function(done){
    checkRegistry()
      .then(function(res){
        assert.ok(typeof res === 'string');
        done();
      });
  });
  it('checkRegistry应该返回一个源', function(done){
    const defaultRegistryUrls = [
      'http://registry.npm.alibaba-inc.com',
      'https://registry.npm.taobao.org',
      'https://registry.npmjs.org'
    ];
    checkRegistry()
      .then(function(res){
        assert.ok(defaultRegistryUrls.includes(res));
        done();
      });
  });
});