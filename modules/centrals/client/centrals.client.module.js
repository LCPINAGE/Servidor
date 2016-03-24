(function (app) {
  'use strict';

  app.registerModule('centrals', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('centrals.services');
  app.registerModule('centrals.routes', ['ui.router', 'centrals.services']);
}(ApplicationConfiguration));
