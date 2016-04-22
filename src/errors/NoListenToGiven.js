export function NoListenToGiven(msg) {
  this.name = 'NoListenToGiven';
  this.message = msg || 'Reducer must listen to something.';
}
NoListenToGiven.prototype = new Error();
