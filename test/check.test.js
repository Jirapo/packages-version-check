const request = require('../lib/request');
const checkRegistry = require('../lib/checkRegistry');
const check = require('../lib/check');
const assert = require('power-assert');
const { join, resolve } = require('path');

describe('check 测试', function() {
  it('传入错误的路径会报错', function(){
    const folder = join(__dirname, '..', '..');
    // const folder = join(__dirname, '..');

    assert.throws(() => check({ folder }), /package.json is not existed!/, 'did not throw with expected message');
  });
  // it('2', function(){
  //   assert(1===2)
  // });
});