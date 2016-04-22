export function NoInitialStateGiven(msg) {
  this.name = 'NoInitialStateGiven';
  this.message = msg || 'Reducer must have initial state.';
}
NoInitialStateGiven.prototype = Error.prototype;
