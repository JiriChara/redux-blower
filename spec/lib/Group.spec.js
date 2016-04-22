import Group from '../../src/Group';
import Reducer from '../../src/Reducer';

describe('Group', () => {
  describe('constructor', () => {
    describe('success', () => {
      let returnValue;
      let reducer;

      beforeEach(() => {
        reducer = new Reducer({
          initialState: 0,
          listenTo: [
            'counter/INCREMENT',
            'counter/DECREMENT'
          ],

          ['counter:INCREMENT']() {},
          ['counter:DECREMENT']() {},
        });

        returnValue = new Group(
          reducer,
          'counter'
        );
      });

      it('saves reference to reducer', () => {
        expect(returnValue.reducer).toBe(reducer);
      });

      // TODO: add more specs
    });
  });
});
