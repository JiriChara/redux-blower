import {
  isObject,
  isArray,
  map
} from 'lodash';

import {
  ArgumentError
} from './errors';

import Action from './Action';

/**
 * Return an array of actions if multiple actions has been request, otherwise
 * return a single instance of Action.
 */
const _buildActions = (group = null, actions = []) => {
  if (isArray(actions)) {
    return map(actions, (action) => new Action(group, action));
  }

  return new Action(group, actions);
};

/**
 * Helper method for easy creation of multiple actions.
 */
const createActions = (...args) => {
  switch (args.length) {
  case 1:
    if (!isObject(args[0])) {
      throw new ArgumentError(
        'Cannot create actions. Action definition must be an object.'
      );
    }
    return _buildActions(args[0].group, args[0].type);
  case 2:
    return _buildActions(args[0], args[1]);
  default:
    throw new ArgumentError(
      'Cannot create actions (wrong number of arguments)'
    );
  }
};

export default createActions;
