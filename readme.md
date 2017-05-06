

Check different verisons of packages from lastest version & versions in package.json & installed version.

## install
===

use in project
```bash
npm i packages-version-check -S
```

or use cli
```bash
npm i packages-version-check -g
```


## usage
===

### cli

```
  Usage: pvc [options] <input>

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -f, --folder [folder]      project folder that contain package.json
      -r, --registry [registry]  npm registry url
```

### code

```
const check = require('packages-version-check');

check({ foloder: 'YOUR_PROJECT_FOLDER', registry: 'YOUR_NPM_REGSITRY'})
  .then(res => {
    console.log(res);
  });

  /*
  res should be:
  {
    dependencies: [
      { name: 'co',
      version: '^4.6.0',
      installedVersion: '4.6.0',
      latestVersion: '4.6.0',
      updateType: null,
      needUpdate: false }, 
      {...}
      ],
    devDependencies: [
      { name: 'espower-loader',
      version: '^1.2.0',
      installedVersion: '1.2.0',
      latestVersion: '1.2.0',
      updateType: null,
      needUpdate: false }, 
      {...}
    ]
  }
  */

```

updateType: 'patch', 'major', 'minor', 'prerelease', 'null', 'build'.




## image
<img src="https://raw.githubusercontent.com/Jirapo/packages-version-check/master/demos/images/cli.png" />
<img src="https://raw.githubusercontent.com/Jirapo/packages-version-check/master/demos/images/demo1.png" />
<img src="https://raw.githubusercontent.com/Jirapo/packages-version-check/master/demos/images/test.png" />
