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

  central.isCurrentUserOwner = !!(req.user && central.user && central.user._id.toString() === req.user._id.toString());
  if(!central.isCurrentUserOwner){
   return res.send({
    message: 'Usuário não tem permissoes necessárias'
  });
 }
 res.json(central);
};

/**
 * Update an central
 */
 exports.update = function (req, res) {
  var central = req.central;

  central.isCurrentUserOwner = !!(req.user && central.user && central.user._id.toString() === req.user._id.toString());
  if(!central.isCurrentUserOwner){
   return res.send({
    message: 'Usuário não tem permissoes necessárias'
  });
 }


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


  central.isCurrentUserOwner = !!(req.user && central.user && central.user._id.toString() === req.user._id.toString());
  if(!central.isCurrentUserOwner){
   return res.send({
    message: 'Usuário não tem permissoes necessárias'
  });
 }
 
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
