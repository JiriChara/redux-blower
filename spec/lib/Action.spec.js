import {
  each
} from 'lodash';

import Action from '../../src/Action';

describe('Action', () => {
  describe('constructor', () => {
    describe('by group and type', () => {
      describe('success', () => {
        let returnValue;

        beforeEach(() => {
          returnValue = new Action('foo', 'BAR');
        });

        it('creates an action with group', () => {
          expect(returnValue.group).toEqual('foo');
        });

        it('creates an action with type', () => {
          expect(returnValue.type).toEqual('BAR');
        });

        it('can have null group', () => {
          expect((new Action(null, 'FOO')).group).toEqual(null);
        });

        it('is checking the name of group', () => {
          const validGroups = [
            'foo',
            'bar/baz',
            'my-groupie',
            'm-'
          ];

          each(validGroups, (valid) => {
            expect(new Action(valid, 'VALID_TYPE')).toBeObject();
          });
        });

        it('is checking the type string', () => {
          const validTypes = [
            'FOO',
            'MY_TYPE',
            'M_'
          ];

          each(validTypes, (valid) => {
            expect(new Action('valid-group', valid)).toBeObject();
          });
        });
      });

      describe('error', () => {
        it('throws an error if group is invalid', () => {
          const invalidGroups = [
            '123',
            '$',
            'foo\\',
            '()'
          ];

          each(invalidGroups, (invalid) => {
            expect(() => new Action(invalid, 'validType')).toThrowErrorOfType(
              'InvalidGroup'
            );
          });
        });

        it('throws an error if type is invalid', () => {
          const invalidTypes = [
            '123',
            '$',
            'foo\\',
            'foo/bar',
            '()'
          ];

          each(invalidTypes, (invalid) => {
            expect(() => new Action('valid-group', invalid)).toThrowErrorOfType(
              'InvalidActionType'
            );
          });
        });
      });
    });

    describe('by type', () => {
      describe('success', () => {
        let returnValue;

        beforeEach(() => {
          returnValue = new Action('FOO');
        });

        it('sets group to null', () => {
          expect(returnValue.group).toBeNull();
        });

        it('sets type to the given type', () => {
          expect(returnValue.type).toEqual('FOO');
        });

        it('returns new instance of action', () => {
          expect(returnValue instanceof Action).toBeTrue();
        });

        it('validates the type string', () => {
          const validTypes = [
            'FOO',
            'MY_TYPE',
            'M_'
          ];

          each(validTypes, (valid) => {
            expect(new Action(valid)).toBeObject();
            expect((new Action(valid)).type).toEqual(valid);
          });
        });
      });

      describe('error', () => {
        it('throws an error if type is not valid', () => {
          const invalidTypes = [
            '$foo',
            'my-TYPE\\',
            '_/',
            null,
            {},
            [],
            1
          ];

          each(invalidTypes, (invalid) => {
            expect(() => new Action(invalid)).toThrowErrorOfType(
              'InvalidActionType'
            );
          });
        });
      });
    });

    describe('by group/type string', () => {
      describe('success', () => {
        let returnValue;

        beforeEach(() => {
          returnValue = new Action('foo/BAR');
        });

        it('creates the action with group and type', () => {
          expect(returnValue.group).toEqual('foo');
          expect(returnValue.type).toEqual('BAR');
        });

        it('can have group with slashes', () => {
          const action = new Action('foo/bar/BAZ');

          expect(action.group).toEqual('foo/bar');
          expect(action.type).toEqual('BAZ');
        });
      });
    });

    describe('no arguments', () => {
      it('throws an error', () => {
        expect(() => new Action()).toThrowErrorOfType(
          'ArgumentError'
        );
      });
    });

    describe('more than 2 arguments', () => {
      it('throws an error', () => {
        expect(() => new Action('one', 'two', 'three')).toThrowErrorOfType(
          'ArgumentError'
        );
      });
    });
  });
});
