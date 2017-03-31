const request = require('../lib/request');
const checkRegistry = require('../lib/checkRegistry');
const assert = require('power-assert');

const defaultRegistryUrls = [
  'http://registry.npm.alibaba-inc.com',
  'https://registry.npm.taobao.org',
  'https://registry.npmjs.org'
];

describe('checkRegistry 异步测试', function() {

  it('checkRegistry应该返回一个string', function(done){
    checkRegistry()
      .then(function(res){
        assert.ok(typeof res === 'string');
        done();
      });
  });
  
  it('checkRegistry应该返回一个源', function(done){
    
    checkRegistry()
      .then(function(res){
        assert.ok(defaultRegistryUrls.includes(res));
        done();
      });
  });

  it('传入参数应该返回参数指定源', function(done){
    const r = 'https://registry.npm.taobao.org';

    checkRegistry(r)
      .then(function(res){
        assert.ok(r === res);
        done();
      });
  });

  it('传入错误源应该返回默认源', function(done){
    const r = 'http://registry.npm.taobao.org';
    
    checkRegistry(r)
      .then(function(res){
        assert.ok(defaultRegistryUrls.includes(res));
        done();
      });
  });
});