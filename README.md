[![Build Status](https://travis-ci.org/JiriChara/redux-blower.svg?branch=master)](https://travis-ci.org/JiriChara/redux-blower)
[![Code Climate](https://codeclimate.com/github/JiriChara/redux-blower/badges/gpa.svg)](https://codeclimate.com/github/JiriChara/redux-blower)
[![Test Coverage](https://codeclimate.com/github/JiriChara/redux-blower/badges/coverage.svg)](https://codeclimate.com/github/JiriChara/redux-blower/coverage)
[![Issue Count](https://codeclimate.com/github/JiriChara/redux-blower/badges/issue_count.svg)](https://codeclimate.com/github/JiriChara/redux-blower)
[![Dependency Status](https://gemnasium.com/badges/github.com/JiriChara/redux-blower.svg)](https://gemnasium.com/github.com/JiriChara/redux-blower)

![redux-blower](https://raw.github.com/JiriChara/redux-blower/master/images/blower.jpg)

**redux-blower** is a tiny library that helps you to improve the readability and the performance of your [Redux](https://github.com/reactjs/redux) applications.

:warning: **Caution** Still work in progress. Library will be finished in next couple of days!

## How?

Typical [Redux](https://github.com/reactjs/redux) application has couple of reducers which are usually functions with big switch statements. When an action is triggered, Redux is going through ALL reducers, ALL switch statements and  ALL `case`s  in order to decide if something should happen. Imagine that you have a Redux application with 100 reducers of average 5 case callbacks. That would mean that for each triggered action up to 500 comparisons has to be made. Additionally reducers will most-likely end up as functions with high complexity and they are not easy to read. Now let me show you what **redux-blower** can do!

```javascript
import createActions from 'redux-blower/createActions';
import createReducer from 'redux-blower/createReducer'

// Create increment & decrement actions
const [
  increment,
  decrement
] = createActions({
  group: 'counter',
  type: [
    'INCREMENT',
    'DECREMENT'
  ]
});

// Alternatively you can do:
// const [increment, decrement] = createActions(
//   'counter',
//   ['INCREMENT', 'DECREMENT'] // order matters
// );

// Or one by one
// const increment = createActions({
//   group: 'counter',
//   type: 'INCREMENT'
// });

// const decrement = createActions({
//   group: 'counter',
//   type: 'DECREMENT'
// });

// Or use just a plain string
// const [increment, decrement] = [
//   'counter:INCREMENT',
//   'counter:DECREMENT'
// ];


// Now let's create a reducer:
const counterReducer = createReducer({
  initialState: {
    value: 0
  },

  listenTo: [
    increment,
    decrement
  ],

  counterIncrement(increment) {
    return this.value + increment;
  }

  // or:
  // ['counter:INCREMENT']() {
  //   return this.value + increment;
  // }

  // or:
  // [increment]() {
  //   return this.value + increment;
  // }

  counterDecrement(decrement) {
    return this.value + decrement;
  }
});
```

In the previous example the `counterReducer` will only react to action that belongs to `counter` group. If an action of different type is fired, then only one comparison will be done for `counterReducer`.

## All is working as expected

```javascript
const reducer = createReducer({
  initialState: 0,
  listenTo: [
    'counter:INCREMENT',
    'counter:DECREMENT'
  ],
  ['counter:INCREMENT']() {
    return ++this.state;
  },
  ['counter:DECREMENT']() {
    return --this.state;
  }
});

reducer(0, 'counter:INCREMENT'); // => 1
reducer(1, 'counter:DECREMENT'); // => 0
```

## License
The MIT License (MIT) - See file 'LICENSE' in this project

## Copyright
Copyright © 2016 Jiri Chara. All Rights Reserved.
