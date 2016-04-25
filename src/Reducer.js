import {
  isUndefined,
  isObject,
  isEmpty
} from 'lodash';

import {
  NoListenToGiven,
  NoInitialStateGiven
} from './errors';

export default class Reducer {
  constructor(options) {
    this.initialState = options.initialState;
    this.listenTo = options.listenTo;

    if (isUndefined(this.initialState)) {
      throw new NoInitialStateGiven();
    }

    if (!isObject(this.listenTo) || isEmpty(this.listenTo)) {
      throw new NoListenToGiven();
    }
  }

  build() {
    return (state = this.initialState, action) => (
      this.hasHandler(action) ?
      this.listenTo[action.type].call({ state, action }, state, action) :
      state
    );
  }

  hasHandler(action) {
    return this.listenTo.hasOwnProperty(action.type);
  }
}
