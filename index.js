var Role = require('auth-role');
var Permission = require('auth-permission');

module.exports = Scope;

/**
 * Create a new scope from given permission and roles.
 *
 * @param Array collection Roles and/or permissions.
 * @api public
 */
function Scope(collection) {
  if (!(this instanceof Scope)) {
    return new Scope(collection);
  }

  this.collection = collection;
};

/**
 * Get scope permissions, including those in scope roles.
 */
Scope.prototype.permissions = function() {
  var permissions = [];
  // Find roles and add their permissions
  for (var len = this.collection.length, i=0; i<len; i++) {
    if (this.collection[i] instanceof Role) {
      permissions = permissions.concat(
        this.collection[i].permissions()
      );
    }
  }
  // find permissions
  for (var len = this.collection.length, i=0; i<len; i++) {
    if (this.collection[i] instanceof Permission) {
      permissions.push(this.collection[i]);
    }
  }
  return permissions;
};

/**
 * Get scope roles.
 */
Scope.prototype.roles = function() {
  var roles = [];
  for (var len = this.collection.length, i=0; i<len; i++) {
    if (this.collection[i] instanceof Role) {
      roles.push(this.collection[i]);
    }
  }
  return roles;
};

/**
 * Find permissions or roles in scope by name.
 */
Scope.prototype.find = function(names) {
  var found = [];
  for (var len = this.collection.length, i=0; i<len; i++) {
      if (~names.indexOf(this.collection[i].name())) {
        found.push(this.collection[i]);
      }
  };
  return found;
};

/**
 * Check whether scope has given role or permission.
 */
Scope.prototype.has = function(name) {
  if (name instanceof Role || name instanceof Permission) {
    name = name.name();
  }
  var collection = this.roles().concat(this.permissions());
  for (var len = collection.length, i=0; i<len; i++) {
    if (collection[i].name() == name) return true;
  }
  return false;
};

/**
 * Returns role or permission names as json.
 */
Scope.prototype.names = function() {
  var names = [];
  for (var len = this.collection.length, i=0; i<len; i++) {
    names.push(this.collection[i].name());
  }
  return names;
};

Scope.prototype.toJSON = Scope.prototype.names;
