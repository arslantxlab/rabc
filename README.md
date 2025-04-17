# Authentication Routes:
## POST api/auth/register
- registers a user and saves hashed password in database (requires name, email, password, and role).

## POST api/auth/login
- compare password with hashed password using Bcrypt and upon successful login, generates a JWT token and sends it back in response.

# Authorization Routes:
## GET api/admin
- verifies Bearer token in the authorization header and grants access if the user has a "admin" role.

## GET api/manager
- verifies Bearer token in the authorization header and grants access if the user has either  "admin" or "manager" role.

## GET api/user
- verifies Bearer token in the authorization header and grants access if the user has "admin", "manager", or "user" role.