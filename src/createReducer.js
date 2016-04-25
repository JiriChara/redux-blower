import Reducer from './Reducer';

const createReducer = (...args) => new Reducer(...args).build();

export default createReducer;
