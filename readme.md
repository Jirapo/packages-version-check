## install

```
npm i packages-version-check -S
```

## usage

```
const check = require('packages-version-check');

check({ foloder: 'YOUR_PROJECT_FOLDER'})
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

updateType: 'patch', 'major', 'minor', 'prerelease', 'null', 'build'

## image
<img src="https://raw.githubusercontent.com/Jirapo/packages-version-check/master/demos/images/demo1.png" />
<img src="https://raw.githubusercontent.com/Jirapo/packages-version-check/master/demos/images/test.png" />
