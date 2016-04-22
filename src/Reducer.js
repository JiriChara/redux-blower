import {
  isEmpty,
  isObject,
  isFunction,
  isString,
  each,
  find,
  filter,
  forOwn,
  bind
} from 'lodash';

import {
  NoListenToGiven,
  NoReducerCallback,
  InvalidAction,
  TooManyReducerCallbacks
} from './errors';

import Group from './Group';
import Action from './Action';

export default class Reducer {
  constructor(opts) {
    this.initialState = opts.initialState;
    this.listenTo = opts.listenTo;

    // The array of groups reducer is reacting to
    this.groups = [];

    if (isEmpty(this.listenTo)) {
      throw new NoListenToGiven();
    }

    forOwn(opts, (val, key) => {
      // TODO: make sure to import only callback functions
      if (isFunction(opts[key])) {
        this[key] = bind(val, this);
      }
    });

    each(this.listenTo, (action) => {
      // Make sure each action has it's callback
      this.checkActionCallbacks(this.convertToAction(action));
    });

    this.startReactor();
  }

  /**
   * Returns a new reducer function.
   */
  build() {
    return (state = this.initialState, argAction) => {
      const action = this.convertToAction(argAction);

      if (!isObject(action) || !(action instanceof Action)) {
        throw new InvalidAction();
      }

      const group = this.getGroup(action.group);

      if (group && group.hasAction(action.type)) {
        // Execute the callback function
        this.callAction(state, action);
      }

      return state;
    };
  }

  /**
   * Call a reducer callback for given action.
   */
  callAction(state, action) {
    return this.getActionCallbacks(action)[0].call(this, state, action);
  }

  /**
   * Return an array of callback methods assigned to a given action.
   * TODO: memoize?
   */
  getActionCallbacks(action) {
    const possibleCallbacks = [
      this[action.toString()],
      this[action.toMethodName()]
    ];

    return filter(possibleCallbacks, (method) => isFunction(method));
  }

  /**
   * Verify that each action has it's callback, throw an error if not.
   */
  checkActionCallbacks(action) {
    const availableMethods = this.getActionCallbacks(action);

    if (isEmpty(availableMethods)) {
      throw new NoReducerCallback(
        `The callback for action: ${action.toString()} was not found in the reducer.`
      );
    }

    if (availableMethods.length > 1) {
      throw new TooManyReducerCallbacks(
        `Too many callbacks defined for action: ${action.toString()}.`
      );
    }
  }

  convertToAction(action) {
    return isString(action) ?
      new Action(action) :
      action;
  }

  /**
   * Initialize all groups and their corresponding actions.
   */
  startReactor() {
    each(this.listenTo, (actionArg) => {
      const action = isString(actionArg) ? new Action(actionArg) : actionArg;

      const group = new Group(this, action.group);

      if (!this.hasGroup(group)) {
        this.groups.push(group);
      }

      group.addAction(action);
    });
  }

  /**
   * Returns true if reducer responds to a given group.
   */
  hasGroup(groupName) {
    return !!this.getGroup(groupName);
  }

  /**
   * Get a group by name.
   */
  getGroup(groupName) {
    return find(this.groups, (group) => group.name === groupName) || null;
  }
}
