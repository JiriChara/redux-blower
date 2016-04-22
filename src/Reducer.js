import {
  isEmpty,
  isObject,
  isFunction,
  isString,
  isUndefined,
  each,
  find,
  filter,
  forOwn,
  some
} from 'lodash';

import {
  NoListenToGiven,
  NoReducerCallback,
  InvalidAction,
  TooManyReducerCallbacks,
  NoInitialStateGiven
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

    if (isUndefined(this.initialState)) {
      throw new NoInitialStateGiven();
    }

    forOwn(opts, (val, key) => {
      if (
        isFunction(opts[key]) && (
          some(this.listenTo, (actionArg) => {
            const action = this.convertToAction(actionArg);

            // TODO: is this really necessary? Make it faster!
            return key === action.toString() ||
              key === action.toMethodName() ||
              key === action;
          })
        )
      ) {
        this[key] = val;
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
    return (state = this.initialState, payload) => {
      if (!isObject(payload) || isUndefined(payload.type)) {
        throw new InvalidAction();
      }

      const action = (isString(payload.group)) ?
        new Action(payload.group, payload.type) :
        this.convertToAction(payload.type);

      const group = this.getGroup(action.group);

      if (group && group.hasAction(action.type)) {
        // Execute the callback function
        return this.callAction(state, action, payload);
      }

      return state;
    };
  }

  /**
   * Call a reducer callback for given action.
   */
  callAction(state, action, payload) {
    const context = {
      state,
      action: payload
    };

    return this.getActionCallbacks(action)[0].call(context, state, payload);
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
      const action = this.convertToAction(actionArg);

      const group = new Group(this, action.group);

      if (!this.hasGroup(group.name)) {
        this.groups.push(group);
      }

      this.getGroup(action.group).addAction(action);
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
    return find(this.groups, (group) => group.name === groupName);
  }
}
