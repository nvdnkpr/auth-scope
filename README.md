# auth-scope

Manage collections of [roles](https://github.com/alexmingoia/auth-role) and
[permissions](https://github.com/alexmingoia/auth-permission).

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

### Scope(roles)

Create a new Scope with given roles and/or permissions.

### scope.permissions

Array of permissions.

## MIT Licensed
