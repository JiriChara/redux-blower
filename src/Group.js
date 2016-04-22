import {
  isObject,
  isString,
  find,
  each
} from 'lodash';

import {
  ArgumentError
} from './errors';

import Reducer from './Reducer';
import Action from './Action';

/**
 * Implementation of the Group class.
 */
export default class Group {
  constructor(reducerPrototype, name) {
    if (
      !isObject(reducerPrototype) ||
      !(reducerPrototype instanceof Reducer)
    ) {
      throw new ArgumentError(
        'Group is expecting reducer to be given.'
      );
    }

    if (!isString(name)) {
      throw new ArgumentError(
        'Group name must be a string.'
      );
    }

    this.reducer = reducerPrototype;
    this.name = name;
    this.actions = [];
  }

  addAction(...args) {
    let counter = 0;

    each(args, (action) => {
      if (
        !isObject(action) ||
        !(action instanceof Action)
      ) {
        throw new ArgumentError(
          'Invalid Action.'
        );
      }

      if (!this.hasAction(action.type)) {
        this.actions.push(action);
        counter++;
      }
    });

    return counter;
  }

  hasAction(type) {
    return !!this.getAction(type);
  }

  getAction(type) {
    return find(this.actions, (action) => action.type === type);
  }
}
