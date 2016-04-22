export function NoReducerCallback(msg) {
  this.name = 'NoReducerCallback';
  this.message = msg || 'No reducer callback implemented for registered action.';
}
NoReducerCallback.prototype = Error.prototype;
