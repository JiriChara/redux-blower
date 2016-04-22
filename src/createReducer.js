import Reducer from './Reducer';

/**
 * Helper function to create a new reducer.
 * (You know functional programming..)
 */
const createReducer = (...args) => new Reducer(...args).build();

export default createReducer;
