import Reducer from '../../src/Reducer';
import Group from '../../src/Group';

describe('Reducer', () => {
  describe('constructor', () => {
    describe('action as a string', () => {
      describe('success', () => {
        const initialState = {
          foo: 1,
          bar: 2
        };
        const listenTo = [
          'counter:INCREMENT',
          'counter:DECREMENT'
        ];
        let returnValue;

        beforeEach(() => {
          returnValue = new Reducer({
            initialState,
            listenTo,
            ['counter:INCREMENT']() {},
            ['counter:DECREMENT']() {},
          });
        });

        it('should set initialState', () => {
          expect(returnValue.initialState).toBe(initialState);
        });

        it('should set listenTo', () => {
          expect(returnValue.listenTo).toBe(listenTo);
        });

        it('adds all groups', () => {
          const groups = returnValue.groups;

          expect(groups).toBeArrayOfObjects();
          expect(groups.length).toEqual(1);
          expect(groups[0] instanceof Group).toBeTrue();
          expect(groups[0].name).toEqual('counter');
        });

        it('adds the callback methods', () => {
          expect(returnValue['counter:INCREMENT']).toBeFunction();
          expect(returnValue['counter:DECREMENT']).toBeFunction();
        });

        it('adds all action to the group', () => {
          const group = returnValue.groups[0];

          expect(group.actions).toBeArrayOfObjects();
          expect(group.actions[0].type).toEqual('INCREMENT');
          expect(group.actions[1].type).toEqual('DECREMENT');
        });
      });

      describe('error', () => {
        it('throws an error if listenTo is not given', () => {
          expect(() => new Reducer({
            initialState: {},
            ['counter:INCREMENT']() {},
            ['counter:DECREMENT']() {},
          })).toThrowErrorOfType('NoListenToGiven');
        });

        it('throws an error if initialState is not given', () => {
          expect(() => new Reducer({
            listenTo: [
              'counter:INCREMENT',
              'counter:DECREMENT'
            ],
            ['counter:INCREMENT']() {},
            ['counter:DECREMENT']() {},
          })).toThrowErrorOfType('NoInitialStateGiven');
        });

        it('throws an error if action string is wrong', () => {
          expect(() => new Reducer({
            initialState: {},
            listenTo: [
              'counter:inc',
              'counter:dec'
            ],
            ['counter:inc']() {},
            ['counter:dec']() {},
          })).toThrowErrorOfType('InvalidActionType');
        });
      });
    });

    describe('action as instance of Action', () => {
      // TODO
    });
  });

  describe('build() method', () => {
    const reducer = new Reducer({
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

    let returnValue;

    beforeEach(() => {
      returnValue = reducer.build();
    });

    it('returns reducer function', () => {
      expect(returnValue).toBeFunction();
    });

    it('calls the increment action', () => {
      expect(returnValue(0, 'counter:INCREMENT')).toEqual(1);
      expect(returnValue(1, 'counter:INCREMENT')).toEqual(2);
    });

    it('calls the decrement action', () => {
      expect(returnValue(0, 'counter:DECREMENT')).toEqual(-1);
      expect(returnValue(1, 'counter:DECREMENT')).toEqual(0);
    });
  });
});
