'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Central = mongoose.model('Central'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var central = new Central();
/**
 * Create an central
 */

/* exports.comando = function (req, res) {
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
}; */

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
  central.descricao = req.body.descricao;

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
  Central.find({ 'user': req.user.id }).sort('-created').populate('user', 'displayName').exec(function (err, centrais) {
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
