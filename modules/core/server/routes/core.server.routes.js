'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller'),
   corePolicy = require('../policies/core.server.policy')

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  // define rota mqtt
  app.route('/api/enviaComando').all(corePolicy.isAllowed)
  .post(core.enviaComando);
};
