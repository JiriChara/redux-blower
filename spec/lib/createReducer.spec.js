import createReducer from '../../src/createReducer';

describe('createReducer', () => {
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

  it('returns new reducer function', () => {
    expect(reducer(0, { type: 'counter:INCREMENT' })).toEqual(1);
    expect(reducer(0, { type: 'counter:DECREMENT' })).toEqual(-1);
  });

  it('returns reducer that passes correct action', () => {
    const actions = [
      'counter:INCREMENT',
      'counter:DECREMENT'
    ];

    const [inc, dec] = actions;

    const myReducer = createReducer({
      initialState: 0,
      listenTo: actions,
      [inc]() {
        return this.state + this.action.payload;
      },
      [dec](state, action) {
        return state - action;
      }
    });

    myReducer(0, { type: 'counter:INCREMENT', payload: 2 }); // => 1
    myReducer(5, { type: 'counter:DECREMENT', payload: 5 }); // => 0
  });
});
