// Create some existing/non-existing actions
var actions = [];
var inc = true;
_.times(1000, function (i) {
  if (i % 2 === 0) {
    return actions.push('counter:' + (!inc ? 'DECREMENT' : 'INCREMENT'));
  }
  return actions.push('some-action');
});

// 20 reducers 12 case statements
var switchReducers = [];

_.times(20, function (i) {
  switchReducers.push(function (state, action) {
    state = state || 0;

    switch(action.type) {
    case 'counter-one:INCREMENT_ONE':
      return state + action.payload;
    case 'counter-one:DECREMENT_ONE':
      return state - action.payload;
    case 'counter-one:INCREMENT_TWO':
      return state + action.payload;
    case 'counter-one:DECREMENT_TWO':
      return state - action.payload;
    case 'counter-one:INCREMENT_THREE':
      return state + action.payload;
    case 'counter-one:DECREMENT_THREE':
      return state - action.payload;
    case 'counter-two:INCREMENT_ONE':
      return state + action.payload;
    case 'counter-two:DECREMENT_ONE':
      return state - action.payload;
    case 'counter-two:INCREMENT_TWO':
      return state + action.payload;
    case 'counter-two:DECREMENT_TWO':
      return state - action.payload;
    case 'counter-two:INCREMENT_THREE':
      return state + action.payload;
    case 'counter-two:DECREMENT_THREE':
      return state - action.payload;
    default:
      return state;
    }
  });
});

var listenTo = {};

listenTo['counter-one:INCREMENT_ONE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-one:DECREMENT_ONE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-one:INCREMENT_TWO'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-one:DECREMENT_TWO'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-one:INCREMENT_THREE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-one:DECREMENT_THREE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:INCREMENT_ONE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:DECREMENT_ONE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:INCREMENT_TWO'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:DECREMENT_TWO'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:INCREMENT_THREE'] = function () {
  return this.state + this.action.payload;
};

listenTo['counter-two:DECREMENT_THREE'] = function () {
  return this.state + this.action.payload;
};

var blowerReducers = [];
_.times(20, function (i) {
  var blowerDef = {
    initialState: 0,
    listenTo: listenTo
  };

  blowerReducers.push(ReduxBlower.createReducer(blowerDef));
});

var switchApp = Redux.combineReducers({
  'O0': switchReducers[0],
  'O1': switchReducers[1],
  'O2': switchReducers[2],
  'O3': switchReducers[3],
  'O4': switchReducers[4],
  'O5': switchReducers[5],
  'O6': switchReducers[6],
  'O7': switchReducers[7],
  'O8': switchReducers[8],
  'O9': switchReducers[9],
  'O10': switchReducers[10],
  'O11': switchReducers[11],
  'O12': switchReducers[12],
  'O13': switchReducers[13],
  'O14': switchReducers[14],
  'O15': switchReducers[15],
  'O16': switchReducers[16],
  'O17': switchReducers[17],
  'O18': switchReducers[18],
  'O19': switchReducers[19]
});
var switchStore = Redux.createStore(switchApp);

var blowerApp = Redux.combineReducers({
  'O0': blowerReducers[0],
  'O1': blowerReducers[1],
  'O2': blowerReducers[2],
  'O3': blowerReducers[3],
  'O4': blowerReducers[4],
  'O5': blowerReducers[5],
  'O6': blowerReducers[6],
  'O7': blowerReducers[7],
  'O8': blowerReducers[8],
  'O9': blowerReducers[9],
  'O10': blowerReducers[10],
  'O11': blowerReducers[11],
  'O12': blowerReducers[12],
  'O13': blowerReducers[13],
  'O14': blowerReducers[14],
  'O15': blowerReducers[15],
  'O16': blowerReducers[16],
  'O17': blowerReducers[17],
  'O18': blowerReducers[18],
  'O19': blowerReducers[19]
});

var blowerStore = Redux.createStore(blowerApp);

// Benchmark Suite
var suite = new Benchmark.Suite('20 Reducer, 12 cases');

suite.add('switch', function () {
  _.each(actions, function (action) {
    switchStore.dispatch({
      type:action
    });
  });
})

.add('blower', function () {
  _.each(actions, function (action) {
    blowerStore.dispatch({
      type:action
    });
  });
})

.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})

.run();
