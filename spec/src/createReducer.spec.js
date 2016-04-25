import createReducer from '../../src/createReducer';

describe('createReducer', () => {
  let reducerFn;
  const initialState = 0;
  const listenTo = {
    ['counter:INCREMENT'](state, action) {
      return state + action.payload;
    },

    ['counter:DECREMENT']() {
      return this.state - this.action.payload;
    }
  };

  beforeEach(() => {
    reducerFn = createReducer({
      initialState,
      listenTo
    });
  });

  it('creates new reducer function', () => {
    expect(reducerFn(0, { type: 'counter:INCREMENT', payload: 2 })).toEqual(2);
    expect(reducerFn(5, { type: 'counter:DECREMENT', payload: 5 })).toEqual(0);
  });
});
