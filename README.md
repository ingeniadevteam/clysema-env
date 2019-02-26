# @clysema/env

[![npm (scoped)](https://img.shields.io/npm/v/@clysema/env.svg)](https://www.npmjs.com/package/@clysema/env)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@clysema/env.svg)](https://www.npmjs.com/package/@clysema/env)

Takes care of NODE_ENV, LOGGER_LEVEL and LOG_FILE enviroment variables.

## Install

```
$ npm install @clysema/env
```

## Usage

```js
const env = require("@clysema/env");

(async () => {
  try {
    console.log(await env());
  } catch (e) {
    console.log(e);
  }
})();
// { env: 'production',
//   isTest: false,
//   isDevelopment: false,
//   logger: { level: 'info', file: '/tmp/controller.log' } }
```
