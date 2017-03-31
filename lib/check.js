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

const checkLatestVerison = function* (item) {

  const { err, data } = yield request(`${newRegistry}/${item.name}/latest`);

  if (!err) item.latestVersion = data.version;

  return item;
};



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