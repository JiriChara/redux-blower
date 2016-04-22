export function ArgumentError(msg) {
  this.name = 'ArgumentError';
  this.message = msg || 'Wrong arguments.';
}
ArgumentError.prototype = Error.prototype;
