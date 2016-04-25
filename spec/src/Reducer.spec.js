import Reducer from '../../src/Reducer';

describe('Reducer', () => {
  let reducer;
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
    reducer = new Reducer({
      initialState,
      listenTo
    });
  });


  describe('constructor', () => {
    it('stores refernce to initialState', () => {
      expect(reducer.initialState).toEqual(initialState);
    });

    it('stores refernce to listenTo', () => {
      expect(reducer.listenTo).toEqual(listenTo);
    });

    it('throws an error if listenTo is not given', () => {
      expect(() => new Reducer({ initialState })).toThrowErrorOfType(
        'NoListenToGiven'
      );
    });

    it('throws an error if initialState is not given', () => {
      expect(() => new Reducer({ listenTo })).toThrowErrorOfType(
        'NoInitialStateGiven'
      );
    });
  });

  describe('build', () => {
    let reducerFn;

    beforeEach(() => {
      reducerFn = reducer.build();
    });

    it('returns new reducer function', () => {
      expect(reducerFn(0, { type: 'counter:INCREMENT', payload: 2 })).toEqual(2);
      expect(reducerFn(5, { type: 'counter:DECREMENT', payload: 5 })).toEqual(0);
    });

    it('returns prev state if no action type not found', () => {
      expect(reducerFn(0, { type: 'foo/bar', payload: 5 })).toEqual(0);
    });
  });
});
