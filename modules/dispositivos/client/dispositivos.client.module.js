(function (app) {
  'use strict';

  app.registerModule('dispositivos', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('dispositivos.services');
  app.registerModule('dispositivos.routes', ['ui.router', 'dispositivos.services']);
}(ApplicationConfiguration));
