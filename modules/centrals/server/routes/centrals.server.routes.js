'use strict';

/**
 * Module dependencies
 */
var centralsPolicy = require('../policies/centrals.server.policy'),
  central = require('../controllers/centrals.server.controller');

module.exports = function (app) {
  // central collection routes
  app.route('/api/centrals').all(centralsPolicy.isAllowed)
    .get(central.list)
    .post(central.create);

  /* app.route('/api/centrals/comando/:centralId').all(centralsPolicy.isAllowed)
    .post(central.comando);*/

  app.route('/api/centrals/sync/:centralId').all(centralsPolicy.isAllowed)
    .get(central.sync);

  // Single article routes
  app.route('/api/centrals/:centralId').all(centralsPolicy.isAllowed)
    .get(central.read)
    .put(central.update)
    .delete(central.delete);

  // Finish by binding the article middleware
  app.param('centralId', central.centralByID);
};
