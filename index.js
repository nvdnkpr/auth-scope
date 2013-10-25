var Role = require('auth-role');
var Permission = require('auth-permission');

module.exports = Scope;

/**
 * Create a new scope with any number of roles or permissions as arguments.
 *
 * @example
 *
 *     // Specify any number of roles or permissions
 *     var scope = new Scope(roleA, permission, roleB, roleC);
 *
 *     // Pass as array instead
 *     var scope = new Scope([roleA, roleB]);
 *
 * @api public
 */
function Scope() {
  if (!(this instanceof Scope)) {
    var scope = Object.create(Scope.prototype);
    Scope.apply(scope, arguments);
    return scope;
  }

  var args = arguments[0];
  if (arguments.length > 1) {
    args = Array.prototype.slice.call(arguments);
  }

  var permissions = [];

  for (var len = args.length; i<len; i++) {
    if (args[i] instanceof Role) {
      this.permissions = this.permissions.concat(args[i].permissions);
    }
    if (args[i] instanceof Permission) {
      this.permissions.push(args[i]);
    }
  };

  Object.defineProperty(this, 'permissions', {
    value: permissions
  });
};

Scope.prototype.toJSON = function() {
  return this.permissions;
};
