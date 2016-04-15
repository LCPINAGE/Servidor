'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke central Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/centrals',
      permissions: '*'
    }, {
      resources: '/api/centrals/:centralId',
      permissions: '*'
    }, {
      resources: '/api/centrals/comando/:centralId',
      permissions: '*'
    }, {
      resources: '/api/centrals/sync/:centralId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/centrals',
      permissions: ['get', 'post']
    }, {
      resources: '/api/centrals/:centralId',
      permissions: ['get', 'put']
    }]
  }]);
};

/**
 * Check If central Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an central is being processed and the current user created it then allow any manipulation
  if (req.central && req.user && req.central.user && req.central.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Erro de autorização');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'Usuário não autorizado'
        });
      }
    }
  });
};
