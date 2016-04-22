export function InvalidGroup(msg) {
  this.name = 'InvalidGroup';
  this.message = msg || 'Group must be a string or null.';
}
InvalidGroup.prototype = Error.prototype;
