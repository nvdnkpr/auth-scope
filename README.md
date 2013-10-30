# auth-scope

Create a scope from collection of
[roles](https://github.com/alexmingoia/auth-role) and/or
[permissions](https://github.com/alexmingoia/auth-permission).

Originally made for use with
[oauth2orize](https://github.com/jaredhanson/oauth2orize/) and the `scope`
parameter, but could be adapted to different scenarios.

## Installation

### Node

```sh
npm install auth-scope
```

### Browser

```sh
component install alexmingoia/auth-scope
```

## Example

```javascript
var Permission = require('auth-permission')
  , Role = require('auth-role')
  , Scope = require('auth-scope');

// Specify any number of roles or permissions
var roles = new Scope([
  Role('api')
    .allow(Permission('read profile'))
    .allow(Permission('read post')),
  Permission('create account'),
  Permission('update billing')
]);

// Create scope from available roles and/or permissions
var scope = new Scope(roles.find(['api', 'create account']));

// Get scope permissions
var permissions = scope.permissions();

JSON.stringify(permissions);
// => ['read profile', 'read post', 'create account']
```

## API

### new Scope(collection)

Create a new scope from collection of permissions and roles.

### scope.find(names)

Find permissions or roles in the scope by name.

### scope.roles()

Returns array of roles.

### scope.permissions()

Returns array of permissions.

## MIT Licensed
