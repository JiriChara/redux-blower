[![Build Status](https://travis-ci.org/JiriChara/redux-blower.svg?branch=master)](https://travis-ci.org/JiriChara/redux-blower)
[![Code Climate](https://codeclimate.com/github/JiriChara/redux-blower/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/redux-blower)
[![Test Coverage](https://codeclimate.com/github/JiriChara/redux-blower/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/redux-blower/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/redux-blower/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/redux-blower)
[![Dependency Status](https://gemnasium.com/badges/github.com/JiriChara/redux-blower.svg)](https://gemnasium.com/github.com/JiriChara/redux-blower)
[![NPM Dowloads](https://img.shields.io/npm/dm/redux-blower.svg)](https://www.npmjs.com/package/redux-blower)
[![NPM Version](https://img.shields.io/npm/v/redux-blower.svg)](https://www.npmjs.com/package/redux-blower)
[![GitHub issues](https://img.shields.io/github/issues/JiriChara/redux-blower.svg)](https://github.com/JiriChara/redux-blower/issues)
[![GitHub stars](https://img.shields.io/github/stars/JiriChara/redux-blower.svg)](https://github.com/JiriChara/redux-blower/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/JiriChara/redux-blower/master/LICENSE)

![redux-blower](https://raw.github.com/JiriChara/redux-blower/master/images/blower.jpg)

**redux-blower** is a tiny library that helps you to improve the readability and the performance of your [Redux](https://github.com/reactjs/redux) applications.

## Motivation

Less code/better performance

## Performance

Reducer implemented with **redux-blower** is currently ~30% faster than regular switch statements reducer ([try it on your own](https://github.com/JiriChara/redux-blower/blob/master/benchmark/benchmark.js)).

## How Does It Work?

```javascript
import { createReducer } from 'redux-blower';

const counterReducer = createReducer({
  initialState: 0,

  listenTo: {
    ['counter:INCREMENT'](state, action) {
      return state + action.payload;
    },

    ['counter:DECREMENT']() {
      return this.state - this.action.payload;
    }
  }
});

counterReducer(0, { type: 'counter:INCREMENT', payload: 2 }); // => 2
counterReducer(5, { type: 'counter:DECREMENT', payload: 5 }); // => 0
```

## Installation

```
npm install redux-blower
```

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
