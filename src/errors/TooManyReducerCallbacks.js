export function TooManyReducerCallbacks(msg) {
  this.name = 'TooManyReducerCallbacks';
  this.message = msg || 'There are multiple callbacks implemented for one action';
}
TooManyReducerCallbacks.prototype = new Error();
