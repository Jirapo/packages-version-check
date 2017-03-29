const fs = require('fs-extra');
const { join } = require('path');
const request = require('./request');
const checkRegistry = require('./checkRegistry');

const exist = fs.existsSync;
const readJson = fs.readJsonSync;

let modulePath = '';

const getPkgPath = (folder) => join(folder, 'package.json');


const loadLocalVerison = (item) => {

  const pkgPath = getPkgPath(join(modulePath, item.name));

  try {

    const pkg = readJson(pkgPath);

    return Object.assign(item, { installedVersion: pkg.version });

  } catch (e) {

    console.log(e.message);
    return item;
  }
};

const loadLatestVerison = (item) => {

};

module.exports = ({ folder, registry }) => {

  const pkgPath = getPkgPath(folder);

  if (!exist(pkgPath)) {
    return new Error('package.json is not existed!');
  }

  const { dependencies, devDependencies } = readJson(pkgPath);

  if (!dependencies && !devDependencies) {
    return [];
  }

  modulePath = join(folder, 'node_modules');

  let dp0 = [];
  let dp1 = [];

  if (dependencies) {
    dp0 = Object.keys(dependencies)
      .map(name => ({
        name,
        version: dependencies[name],
      }))
      .map(loadLocalVerison);
  }


  if (devDependencies) {
    dp1 = Object.keys(devDependencies)
      .map(name => ({
        name,
        version: devDependencies[name],
      }))
      .map(loadLocalVerison);
  }


  console.log(dp0, dp1);



  // return fetch(url, options)
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(data => ({ data }))
  //   .catch(err => ({ err }));
};