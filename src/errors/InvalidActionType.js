export function InvalidActionType(msg) {
  this.name = 'InvalidActionType';
  this.message = msg || 'Action must be a string.';
}
InvalidActionType.prototype = new Error();
