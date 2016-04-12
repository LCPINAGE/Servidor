'use strict';

var validator = require('validator');

/**
 * Render the main application page
 */
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com');
client.on('connect', function () {
  client.subscribe('topico_mensura_out');
  client.publish('topico_mensura_in', 'Ola');
});

// Tratamento de mensagens recebidas pelo mqtt
var msg = null; 
var recebeExtensor = false;
var buffer = [];
client.on('message', function (topic, message) {
  msg = message.toString().toUpperCase();
  if(recebeExtensor){
    if(msg == 'FI'){
      recebeExtensor = false;
    } else { 
      var i = buffer.lenght + 1;x
      buffer[i] = msg;
    }
  } else {

    switch (msg) {
      case 'AE':
        recebeExtensor =true;
      break;
    }
  }
});

 

exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: safeUserObject
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
