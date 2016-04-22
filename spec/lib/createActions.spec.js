import createActions from '../../src/createActions';
import Action from '../../src/Action';
import {
  each
} from 'lodash';

// TODO: add test that verifies that null is allowed as group
describe('createActions', () => {
  describe('single argument', () => {
    describe('single action', () => {
      let returnValue;

      beforeEach(() => {
        returnValue = createActions({
          group: 'foo',
          type: 'BAR'
        });
      });

      it('returns single action with group and type', () => {
        expect(returnValue).toImplement({
          group: String,
          type: String
        });
      });

      it('returns instance of Action class', () => {
        expect(returnValue instanceof Action).toBeTrue();
      });
    });

    describe('multiple actions', () => {
      const returnValue = createActions({
        group: 'foo',
        type: ['BAR', 'BAZ']
      });

      it('returns array of actions with group and type', () => {
        expect(returnValue).toBeArrayOfObjects();
        expect(returnValue).toBeArrayOfSize(2);
      });

      it('returns array of instances of Action class', () => {
        each(returnValue, (action) => {
          expect(action instanceof Action).toBeTrue();
        });
      });
    });

    describe('error', () => {
      const invalidArgs = [
        'foo', true, 1, undefined, null
      ];

      it('throws an error if action is not an object', () => {
        each(invalidArgs, (invalid) => {
          expect(() => createActions(invalid)).toThrowErrorOfType(
            'ArgumentError'
          );
        });
      });
    });
  });

  describe('two arguments', () => {
    describe('single action', () => {
      let returnValue;

      beforeEach(() => {
        returnValue = createActions('foo', 'BAR');
      });

      it('returns single action with group and type', () => {
        expect(returnValue).toImplement({
          group: String,
          type: String
        });
      });

      it('returns instance of Action class', () => {
        expect(returnValue instanceof Action).toBeTrue();
      });

      it('sets group of an action', () => {
        expect(returnValue.group).toEqual('foo');
      });

      it('sets type of an action', () => {
        expect(returnValue.type).toEqual('BAR');
      });
    });

    describe('multiple actions', () => {
      let returnValue;

      beforeEach(() => {
        returnValue = createActions(
          'foo',
          ['BAR', 'BAZ']
        );
      });

      it('returns array of actions with group and type', () => {
        expect(returnValue).toBeArrayOfObjects();
        expect(returnValue).toBeArrayOfSize(2);
      });

      it('returns array of instances of Action class', () => {
        each(returnValue, (action) => {
          expect(action instanceof Action).toBeTrue();
        });
      });
    });
  });

  it('throws an error if more than 2 args or no arg is given', () => {
    expect(() => createActions()).toThrowErrorOfType(
      'ArgumentError'
    );

    expect(() => createActions('one', 'two', 'three')).toThrowErrorOfType(
      'ArgumentError'
    );
  });
});
