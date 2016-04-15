'use strict';

/**
 * Module dependencies
 */
 var acl = require('acl');
 var path = require('path'),
  mongoose = require('mongoose'),
  Dispositivo = mongoose.model('Dispositivo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Dispositivos Permissions
 */
 exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/dispositivos',
      permissions: '*'
    }, {
      resources: '/api/dispositivos/:dispositivoId',
      permissions: '*'
    },{
      resources: '/api/dispositivos/:dispositivoId/turnOnOff',
      permissions: ['get']
    },{
      resources: '/api/dispositivos/procuraDispositivos',
      permissions: ['get']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/dispositivos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/dispositivos/:dispositivoId',
      permissions: ['get', 'post', 'put', 'delete']
    }, {
      resources: '/api/dispositivos/:dispositivoId/turnOnOff',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Dispositivos Policy Allows
 */
 exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an dispositivo is being processed and the current user created it then allow any manipulation
  //if (req.dispositivo && req.user && req.dispositivo.user && req.dispositivo.user.id === req.user.id) {
    if (req.dispositivo && req.user && req.dispositivo.user && req.dispositivo.user.id === req.user.id) {
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
