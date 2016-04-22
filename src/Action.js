import {
  isNull,
  isString
} from 'lodash';

import {
  InvalidGroup,
  InvalidActionType,
  ArgumentError
} from './errors';

/**
 * Regex for the type of the action.
 */
const TYPE_REGEX_STRING = '[A-Z][A-Z_]*';
const TYPE_REGEX = new RegExp(`^${TYPE_REGEX_STRING}$`);

/**
 * Regex for the group of the action.
 */
const GROUP_REGEX_STRING = '[a-z][a-z\\-\\/]*';
const GROUP_REGEX = new RegExp(`^${GROUP_REGEX_STRING}$`);

const SEPARATOR_REGEX_STRING = '[\\/:]';

/**
 * Regex to get the action type & group name from string.
 * foo/bar => group: foo, type: bar
 * foo/bar/baz => group: foo/bar, type: baz
 */
const ACTION_REGEX = new RegExp(
  `^(${GROUP_REGEX_STRING})${SEPARATOR_REGEX_STRING}(${TYPE_REGEX_STRING})$`
);

export default class Action {
  constructor(...args) {
    if (args.length === 0) {
      throw new ArgumentError(
        'Cannot create action without group & type.'
      );
    }

    if (args.length > 2) {
      throw new ArgumentError(
        'Cannot create action. Wrong number of arguments.'
      );
    }

    [this.group, this.type] = (args.length === 1) ?
      this._extractGroupAndType(args[0]) :
      [args[0], args[1]];

    this.validateGroup(this.group);
    this.validateType(this.type);
  }

  toString() {
    return isNull(this.group) ?
      this.action :
      `${this.group}:${this.type}`;
  }

  toMethodName() {
    return this.toString().replace(
      /[\-_/:][a-zA-Z]/g, (match) => match.charAt(1).toUpperCase()
    );
  }

  validateGroup(group) {
    if (!isNull(group) && (!isString(group) || !this.getGroupRegex().test(group))) {
      throw new InvalidGroup();
    }
  }

  validateType(type) {
    if (!this.getTypeRegex().test(type)) {
      throw new InvalidActionType();
    }
  }

  _extractGroupAndType(action) {
    if (!isString(action)) {
      throw new InvalidActionType(
        'Cannot create action. The type must be a string.'
      );
    }

    const match = action.match(this.getActionRegex());

    return match ? [match[1], match[2]] : [null, action];
  }

  /**
   * Overrideable.
   */
  getGroupRegex() {
    return GROUP_REGEX;
  }

  /**
   * Overridable.
   */
  getTypeRegex() {
    return TYPE_REGEX;
  }

  /**
   * Overridable.
   */
  getActionRegex() {
    return ACTION_REGEX;
  }
}
