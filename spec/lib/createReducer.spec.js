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
    expect(reducer(0, 'counter:INCREMENT')).toEqual(1);
    expect(reducer(0, 'counter:DECREMENT')).toEqual(-1);
  });
});
