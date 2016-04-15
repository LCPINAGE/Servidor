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

  // Single article routes
  app.route('/api/centrals/:centralId').all(centralsPolicy.isAllowed)
    .get(central.read)
    .put(central.update)
    .delete(central.delete);

  // Finish by binding the article middleware
  app.param('centralId', central.centralByID);
};
