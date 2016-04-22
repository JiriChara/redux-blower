export function InvalidAction(msg) {
  this.name = 'InvalidAction';
  this.message = msg || 'Action must be instance of Action class.';
}
InvalidAction.prototype = new Error();
