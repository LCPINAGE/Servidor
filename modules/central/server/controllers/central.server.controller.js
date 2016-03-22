'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Central = mongoose.model('Central'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqtt-dashboard.com');

client.on('connect', function() {
  client.subscribe('topico_mensura_out');
  client.publish('topico_mensura_in', 'Central conectada.');
});

client.on('message', function(topic, message) {
  console.log(message.toString());
  var dados = message.toString();
  console.log(dados);
  var central = new Central();
 /* central.title = 'Movimento Detectado';
  central.content = message.toString();
  central.save(function(err) {
    if (err) {
      console.log('Erro ao salvar no banco de dados');
      console.log(err);
    } else {
      console.log('Dado salvo com sucesso');
    }
  });*/
});

exports.activate = function () {
  client.publish('topico_mensura_out', '4000');
  console.log('Dado 4000 enviado mqtt');
};

exports.desactivate = function () {
  client.publish('topico_mensura_out', '4001');
  console.log('Dado 4001 enviado mqtt');
};
/**
 * Create an central
 */

exports.comando = function (req, res) {
  var comando = req.body.comando;
  var central = req.central;
  client.publish(central.canal_mqtt, comando, null, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json("Comando enviado");
    }
  });
};

exports.sync = function(req, res) {
  var central = req.central;
  res.json(central.dispositivos_conectados);
};

exports.create = function (req, res) {
  var central = new Central(req.body);
  central.user = req.user;
  central.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(central);
    }
  });
};
/**
 * Show the current central
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var central = req.central ? req.central.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  central.isCurrentUserOwner = !!(req.user && central.user && central.user._id.toString() === req.user._id.toString());

  res.json(central);
};

/**
 * Update an central
 */
exports.update = function (req, res) {
  var central = req.central;

  central.nome = req.body.nome;

  central.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(central);
    }
  });
};

/**
 * Delete an central
 */
exports.delete = function (req, res) {
  var central = req.central;

  central.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(central);
    }
  });
};

/**
 * List of central
 */
exports.list = function (req, res) {
  Central.find().sort('-created').populate('user', 'displayName').exec(function (err, centrais) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(centrais);
    }
  });
};

/**
 * central middleware
 */
exports.centralByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Operação inválida'
    });
  }

  Central.findById(id).populate('user', 'displayName').exec(function (err, central) {
    if (err) {
      return next(err);
    } else if (!central) {
      return res.status(404).send({
        message: 'Nenhuma central encontrado'
      });
    }
    req.central = central;
    next();
  });
};
