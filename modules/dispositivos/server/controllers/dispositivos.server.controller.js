'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dispositivo = mongoose.model('Dispositivo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var counter;

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com');
client.on('connect', function () {
  client.subscribe('topico_mensura_out');
  client.publish('topico_mensura_in', 'Ola');
});

var msg = null; 
client.on('message', function (topic, message) {
    msg = message.toString(); 
    console.log(message.toString());
  });

exports.procuraDispositivos = function (req, res) {
  client.publish('topico_mensura_in', 'AC');
  return res.json({ "sucess": true });  
};

exports.turnOnOff = function (req, res) {
  var dispositivo = req.dispositivo;
  if (dispositivo.estado) {
    dispositivo.estado = false;
  } else {
    dispositivo.estado = true;
  }
  dispositivo.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({ "sucess": true });
    }
  });
};
/**
 * Create an dispositivo
 */
exports.create = function (req, res) {
  var dispositivo = new Dispositivo(req.body);
  dispositivo.user = req.user;
  dispositivo.central = req.user.central;
  dispositivo.id_disp_central = Dispositivo.count({ 'central': req.user.central }, function(error, nbDocs) {
    if (error) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(error)
      });
    } else {
      nbDocs += 1;
      dispositivo.id_disp_central = nbDocs;
      dispositivo.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(dispositivo);
        }
      });
    }
  });
};


/**
 * Show the current dispositivo
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var dispositivo = req.dispositivo ? req.dispositivo.toJSON() : {};

  // Add a custom field to the Dispositivo, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Dispositivo model.
  dispositivo.isCurrentUserOwner = !!(req.user && dispositivo.user && dispositivo.user._id.toString() === req.user._id.toString());

  res.json(dispositivo);
};

/**
 * Update an dispositivo
 */
exports.update = function (req, res) {
  var dispositivo = req.dispositivo;

  dispositivo.nome = req.body.nome;
  dispositivo.descricao = req.body.descricao;
  dispositivo.tipo = req.body.tipo;
  dispositivo.central = req.body.central;

  dispositivo.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(dispositivo);
    }
  });
};

/**
 * Delete an dispositivo
 */
exports.delete = function (req, res) {
  var dispositivo = req.dispositivo;

  dispositivo.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(dispositivo);
    }
  });
};

/**
 * List of Dispositivos
 */
exports.list = function (req, res) {
  Dispositivo.find({ 'user': req.user.id, 'central': req.user.central }).sort('-created').populate('user', 'displayName').exec(function (err, dispositivos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(dispositivos);
    }
  });
};


/**
 * Dispositivo middleware
 */
exports.dispositivoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dispositivo inválido'
    });
  }

  Dispositivo.findById(id).populate('user', 'displayName').exec(function (err, dispositivo) {
    if (err) {
      return next(err);
    } else if (!dispositivo) {
      return res.status(404).send({
        message: 'Nenhum dispositivo encontrado'
      });
    }
    req.dispositivo = dispositivo;
    next();
  });
};
