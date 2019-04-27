---

title: No More Explicit process.env
date: 2018-12-07 17:47:10
tags: [Node.js, 12 Factor]
categories: []
type: post

---

✨ 12 Factor-compliant config loader script for environment variable

<!-- more -->

<a href="https://github.com/Maecenas/no-more-explict-process-env/" target="_blank"><img src="https://img.shields.io/github/stars/Maecenas/no-more-explict-process-env.svg?style=social" alt="GitHub stars"></img></a>

This article contains some code template that would elaborate you from the dull routine of adding `process.env ||` at the beginning of each Node.js configuration file. Following the [12 Factor's config methodology](https://12factor.net/config), configs are stored in the environment variable, while also be able to read from files for default setting/ bootstrapping, etc. 

## Motivation

The motivation of the project are from the [ES6 tutorial](https://github.com/ruanyf/es6tutorial/) and [SmartVIS Back-End](https://github.com/Maecenas/smart-vis-backend) project that I've been doing. I'm excited by the idea of using the ES6's `Proxy`, `Reflect` and `Symbol` feature to introduce an automatic environmental variable loader, without hampering how the rest of code is retrieving configs from file.

```javascript
// src/app.js
const config = require("../config");
```

## So… What it's like?

We want to keep it this way, and with 50 lines of code, the explicitly annoying `process.env` is now exempted from config implementation.

```javascript
// FROM: config.js (or config/index.js)
module.exports = {
  env: {
    PORT: process.env.PORT || 3000
  },
  database: {
    HOST: process.env.DATABASE_HOST || "mysql",
    PORT: process.env.DATABASE_PORT || "3306",
    USER: process.env.DATABASE_USER || "example",
    PASSWORD: process.env.DATABASE_PASSWORD || "example",
    DATABASE: process.env.DATABASE_DATABASE || "example"
  }
};
```

```javascript
// TO: config/default.js
module.exports = {
  env: {
    PORT: 3000
  },
  database: {
    HOST: "mysql",
    PORT: "3306",
    USER: "example",
    PASSWORD: "example",
    DATABASE: "example"
  }
};
```

## Intuition and Installation

But how can we possibly achieve this? The answer is the magical [`config/index.js`](https://github.com/Maecenas/no-more-explict-process-env/blob/master/config/index.js) that I'm going to introduce to you. The intuition is quite clear and straight forward: whenever a client try to get a certain config, we first search for `process.env` and otherwise return the default value (`process.env.KEY || 'default_value'`). An extra key is required for configs of `process.env.SERVICE_FIELD` in order to store the previously called service. ES6's `Proxy`, `Reflect` and `Symbol` feature are required as to intercept the getter. You may check for implementation for more detail.

To get the power of [`no-more-explict-process-env`](https://github.com/Maecenas/no-more-explict-process-env/), just download the [`config/index.js`](https://github.com/Maecenas/no-more-explict-process-env/blob/master/config/index.js) and organized it like the templates, and enjoy!

## Show me the code

```javascript
/* eslint-disable no-process-env */
"use strict";

const config = require("./default");

const KEY = Symbol();

function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function ProxyFactory(obj) {
  /**
   * Handler with getter to return env/value/Proxy<-object when inspecting configs
   *
   * @type {{get}}
   */
  const configHandler = {
    get: (target, key, receiver) => {
      // Concat to the matched name required for env
      // e.g. config.oss.sts.ROLE_ARN -> OSS_STS_ROLE_ARN
      const envName = [Reflect.get(target, KEY, receiver), key]
        .filter(Boolean)
        .map(_ => _.toString().toUpperCase())
        .join("_");
      // Return the environment variable if there is one
      const p = process.env[envName];
      if (p) {
        return p;
      }
      // Get original value/object
      const o = Reflect.get(target, key, receiver);
      // Return the value/undefined
      if (!isObject(o)) {
        return o;
      }
      // Return ProxyFactory(obj) with new object appended with a Symbol key to store envName
      return ProxyFactory(
        {
          ...o,
          [KEY]: envName
        },
        configHandler
      );
    }
  };
  return new Proxy(obj, configHandler);
}

/**
 * Loader for environmental variable configs named after <SERVICE_FIELD> if set else config
 *
 * @type {Proxy}
 */
module.exports = ProxyFactory(config);
```
