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

## How?

Typical [Redux](https://github.com/reactjs/redux) application has couple of reducers which are usually functions with big switch statements. When an action is triggered, Redux is going through ALL reducers, ALL switch statements and  ALL `case`s  in order to decide if something should happen. Imagine that you have a Redux application with 100 reducers of average 5 case callbacks. That would mean that for each triggered action up to 500 comparisons has to be made. Additionally reducers will most-likely end up as functions with high complexity and they are not easy to read. Now let me show you what **redux-blower** can do!

```javascript
const actions = [
  'counter:INCREMENT',
  'counter:DECREMENT'
];

const [inc, dec] = actions;

const counterReducer = createReducer({
  initialState: 0,
  listenTo: actions,
  [inc]() {
    return this.state + action.payload;
  },
  [dec](state, action) {
    return state - action.payload;
  }
});

reducer(0, { type: 'counter:INCREMENT', payload: 2 }); // => 2
reducer(5, { type: 'counter:DECREMENT', payload: 5 }); // => 0
```

In the previous example the `counterReducer` will only react to action that belongs to `counter` group. If an action of different type is fired, then only one comparison will be done for `counterReducer`.

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
