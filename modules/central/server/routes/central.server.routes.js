'use strict';

/**
 * Module dependencies
 */
var centralPolicy = require('../policies/central.server.policy'),
  central = require('../controllers/central.server.controller');

module.exports = function (app) {
  // central collection routes
  app.route('/api/central').all(centralPolicy.isAllowed)
    .get(central.list)
    .post(central.create);

  app.route('/api/central/comando/:centralId').all(centralPolicy.isAllowed)
    .post(central.comando);

  app.route('/api/central/sync/:centralId').all(centralPolicy.isAllowed)
    .get(central.sync);

  // Single article routes
  app.route('/api/central/:centralId').all(centralPolicy.isAllowed)
    .get(central.read)
    .put(central.update)
    .delete(central.delete);

  // Finish by binding the article middleware
  app.param('centralId', central.centralByID);
};
