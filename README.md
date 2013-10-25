# scope

Manage collections of [roles] and [permissions].

```sh
npm install auth-scope
```

## Example

```javascript
var Scope = require('auth-scope');

module.exports.availableScopes = {
  'basic': new Scope(roleA, permission, roleB, roleC)
};
```

## API

### Scope(roles|permissions)

### scope.permissions

Array of permissions.

## MIT Licensed
