const request = require('../lib/request');
const checkRegistry = require('../lib/checkRegistry');
const check = require('../lib/check');
const assert = require('power-assert');
const { join, resolve } = require('path');

describe('check 测试', function() {
  it('传入错误的路径会报错', function(){
    const folder = join(__dirname, '..', '..');
    assert.throws(() => check({ folder }), /package.json is not existed!/, 'did not throw with expected message');
  });

  it('传入无依赖的package.json会返回空值', function(done){
    const folder = join(__dirname, 'data1');

    check({ folder })
      .then(res => {
        assert.deepEqual(res, {
          dependencies: [],
          devDependencies: [],
        });
        done();
      })
  });

  it('传入有依赖的package.json会返回不为空的值', function(done){
    const folder = join(__dirname, '..');

    check({ folder })
      .then(res => {
        assert.ok(res.dependencies.length > 0 && res.devDependencies.length > 0)
        done();
      });
  });
  
});