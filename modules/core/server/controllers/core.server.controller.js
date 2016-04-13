'use strict';

var validator = require('validator');

var mongoose = require('mongoose'),
Central = mongoose.model('Central');

/**
 * Funções Mqtt
 */

 var mqtt    = require('mqtt');
 var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com');
 client.on('connect', function () {
  client.subscribe('topico_mensura_out');
  client.publish('topico_mensura_in', 'Ola');
});

// recebeComando
var msg = null; 
var recebeExtensor = false;
var buffer = [];
client.on('message', function (topic, message) {
  msg = JSON.parse(message);
  console.log(msg);
  console.log(msg.id_central);

});


exports.enviaComando = function(req, res){

  var id_central = req.user.central;
  console.log(id_central);
  Central.find({ '_id': id_central }).exec(function (err, centralSelected) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var dados = req.body;
      if (dados.id == null && dados.comando == null) {
        return res.status(400).send({
          success: false
        });
      } else {
        var central = centralSelected[0];
       client.publish(central.topico_mqtt, '*' + dados.id + '%' + dados.comando);
       res.json({success: true});
     }
   }
 });
};

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
