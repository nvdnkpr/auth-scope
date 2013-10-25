var Role = require('auth-role');
var Permission = require('auth-permission');

module.exports = Scope;

/**
 * Create a new scope from `requested` names
 * and `available` roles and/or permissions.
 *
 * @example
 *
 *     var Permission = require('auth-permission')
 *       , Role = require('auth-role')
 *       , Scope = require('auth-scope');
 *
 *     // Specify any number of roles or permissions
 *     var available = [
 *       Role('api')
 *         .allow(Permission('read profile'))
 *         .allow(Permission('read post')),
 *       Permission('create account'),
 *       Permission('update billing')
 *     ];
 *
 *     // Create scope from available roles and/or permissions
 *     var scope = new Scope(['api', 'create account'], available);
 *
 *     // Get scope permissions
 *     var permissions = scope.permissions();
 *
 *     JSON.stringify(permissions);
 *     // => ['read profile', 'read post', 'create account']
 *
 * @api public
 */
function Scope(requested, available) {
  if (!(this instanceof Scope)) {
    return new Scope(requested, available);
  }

  var permissions = [];

  for (var len = available.length; i<len; i++) {
    if (available[i] instanceof Role) {
      var role = available[i];
      if (~requested.indexOf(role.name)) {
        this.permissions = this.permissions.concat(role.permissions);
      }
    }
    if (available[i] instanceof Permission) {
      var permission = available[i];
      if (~requested.indexOf(permission.name())) {
        this.permissions.push(permission);
      }
    }
  };

  Object.defineProperty(this, 'scope', {
    value: permissions
  });
};

Scope.prototype.permissions = Scope.prototype.toJSON = function() {
  return this.scope;
};
