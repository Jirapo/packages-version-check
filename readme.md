## install

```
npm i modules-version-check -S
```

## usage

```
const check = require('modules-version-check');

check({ foloder: 'YOUR_PROJECT_FOLDER'})
  .then(res => {
    console.log(res);
  });

```
