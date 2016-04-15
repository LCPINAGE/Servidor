'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dispositivo = mongoose.model('Dispositivo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.turnOnOff = function (req, res) {
  var dispositivo = req.dispositivo;

  dispositivo.isCurrentUserOwner = !!(req.user && dispositivo.user && dispositivo.user._id.toString() === req.user._id.toString());
   if(!dispositivo.isCurrentUserOwner){
     return res.send({
        message: 'Usuário não tem permissoes necessárias'
      });
   }

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
      if (dispositivo.estado) {
        res.json({estado : true});
      } else {
        res.json({estado : false});
      }
    }
  });
};

exports.listaHistorico = function(req, res){
  var dispositivo = req.dispositivo;
  var n = req.body.qtde;
  console.log(n);
  var historicoTemp = [n];
  for(var i = 0; i< n; i++){
    historicoTemp[i] = dispositivo.historico[i];
  }

  res.send(historicoTemp);

}

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

 dispositivo.isCurrentUserOwner = !!(req.user && dispositivo.user && dispositivo.user._id.toString() === req.user._id.toString());
   if(!dispositivo.isCurrentUserOwner){
     return res.send({
        message: 'Usuário não tem permissoes necessárias'
      });
   }
  res.json(dispositivo);
};

/**
 * Update an dispositivo
 */
exports.update = function (req, res) {
  var dispositivo = req.dispositivo;

  dispositivo.isCurrentUserOwner = !!(req.user && dispositivo.user && dispositivo.user._id.toString() === req.user._id.toString());
   if(!dispositivo.isCurrentUserOwner){
     return res.send({
        message: 'Usuário não tem permissoes necessárias'
      });
   }

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

  dispositivo.isCurrentUserOwner = !!(req.user && dispositivo.user && dispositivo.user._id.toString() === req.user._id.toString());
   if(!dispositivo.isCurrentUserOwner){
     return res.send({
        message: 'Usuário não tem permissoes necessárias'
      });
   }

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
