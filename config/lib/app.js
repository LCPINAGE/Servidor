'use strict';

/**
 * Module dependencies.
 */
 var config = require('../config'),
 mongoose = require('./mongoose'),
 express = require('./express'),
 chalk = require('chalk'),
 seed = require('./seed');

 function seedDB() {
  if (true) { // config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Aviso:  Usuarios iniciais ativados'));
    seed.start();
  }
}

// Initialize Models
mongoose.loadModels(seedDB);

module.exports.loadModels = function loadModels() {
  mongoose.loadModels();
};

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, config);

  });
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('Versao:     ' + config.meanjs.version));
      if (config.meanjs['Uros-version'])
        console.log(chalk.green('UrOS versao: ' + config.meanjs['meanjs-version']));
      console.log('--');

      if (callback) callback(app, db, config);
    });

  });

};
