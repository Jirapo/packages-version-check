const fs = require('fs-extra');
const { join } = require('path');
const co = require('co');
const request = require('./request');
const checkRegistry = require('./checkRegistry');

const exist = fs.existsSync;
const readJson = fs.readJsonSync;

let modulePath = '';
let newRegistry = '';

const getPkgPath = (folder) => join(folder, 'package.json');

/*
* 获取本地安装版本
*/
const checkLocalVerison = (item) => {

  const pkgPath = getPkgPath(join(modulePath, item.name));

  try {
    const pkg = readJson(pkgPath);

    return Object.assign(item, { installedVersion: pkg.version });

  } catch (e) {

    console.log(e.message);

    return item;
  }
};

const getLocalVersion = (dependencies) => {

  return Object.keys(dependencies)
      .map(name => ({
        name,
        version: dependencies[name],
      }))
      .map(checkLocalVerison);
}

/*
* 获取源上最新版本
*/
const checkLatestVerison = function* (item) {

  const { err, data } = yield request(`${newRegistry}/${item.name}/latest`);

  if (!err) item.latestVersion = data.version;

  return item;
};

/**
 * Requests a folder path & registry, returning a promise.
 *
 * @param  {string} folder    项目路径
 * @param  {string} registry  指定源，不指定则采用默认源 
 * @return {object}           返回对象包含 dependencies 和 devDependencies
 */

module.exports = ({ folder, registry }) => {

  const pkgPath = getPkgPath(folder);

  if (!exist(pkgPath)) throw new Error('package.json is not existed!');

  const { dependencies = {}, devDependencies = {} } = readJson(pkgPath);

  modulePath = join(folder, 'node_modules');

  let dp0 = getLocalVersion(dependencies);
  let dp1 = getLocalVersion(devDependencies);

  return co(function* () {

    if (dp0.length === 0 && dp1.length === 0) {
      return {
        dependencies: dp0,
        devDependencies: dp1,
      };
    }

    newRegistry = yield checkRegistry(registry);

    dp0 = yield dp0.map(checkLatestVerison);
    dp1 = yield dp1.map(checkLatestVerison);

    return {
      dependencies: dp0,
      devDependencies: dp1,
    };
  });
  
};