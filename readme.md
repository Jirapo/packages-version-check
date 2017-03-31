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

```
