'use strict';

/**
 * Module dependencies
 */
var dispositivosPolicy = require('../policies/dispositivos.server.policy'),
  dispositivos = require('../controllers/dispositivos.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/dispositivos').all(dispositivosPolicy.isAllowed)
    .get(dispositivos.list)
    .post(dispositivos.create);

  // Single dispositivo routes
  app.route('/api/dispositivos/:dispositivoId').all(dispositivosPolicy.isAllowed)
    .get(dispositivos.read)
    .put(dispositivos.update)
    .delete(dispositivos.delete);

  app.route('/api/dispositivos/:dispositivoId/turnOnOff').all(dispositivosPolicy.isAllowed)
   .get(dispositivos.turnOnOff);

  // Finish by binding the dispositivo middleware
  app.param('dispositivoId', dispositivos.dispositivoByID);
};
