'use strict';

var validator = require('validator');

var mongoose = require('mongoose'),
Central = mongoose.model('Central'),
Dispositivo = mongoose.model('Dispositivo'),
path = require('path'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Recebe comando Mqtt
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

  switch(msg.tipo_dado){

    case "msg_extensor":

    if(msg.id_central !=null && msg.id_extensor != null && msg.dado !=null){

     Dispositivo.find({ 'id_disp_central': msg.id_extensor, 'central': msg.id_central }).exec(function (err, dispositivos) {
      if (!err) {
        console.log("achou");
        var dispositivo = dispositivos[0];
        dispositivo.historico.unshift(msg.dado);
        console.log(dispositivo.historico);
        dispositivo.save(function (err) {
          if (err) {
            console.log(errorHandler.getErrorMessage(err));
          } else {
            console.log("Salvou");
          }
        });
      }
    });

   }
 break;// msg_extensor

 case "nova_central":

 if(msg.id_usuario !=null && msg.nome_central != null){

  var central = new Central();
  var topico_mqtt_central = msg.nome_central + msg.id_usuario + Date.now();

  central.nome = msg.nome_central;
  central.user = msg.id_usuario;
  central.topico_mqtt = topico_mqtt_central;

  central.save(function (err) {
    if (err) {
      console.log(errorHandler.getErrorMessage(err));
    } else {
      console.log("salvou");

      var msgEnvia = "{'id_central': ' " + central.id +  "' , 'topico_mqtt':'" + 
      topico_mqtt_central + "', 'nome_central':'" + central.nome + "'}";
      console.log(msgEnvia);
      client.publish("topico_mensura_in", msgEnvia);
    }
  });
}
 break;// nova_central

 case "teste_canal":
 if(msg.id_central!=null){
  Central.find({'_id': msg.id_central}).exec(function(err, centrals){
    if(err){
      console.log(errorHandler.getErrorMessage(err));
    }else{
      var central = centrals[0];
      client.publish(central.topico_mqtt,"teste de canal");
    }
  });
}
 break;//teste_canal

}//fecha switch
});//fecha client.on


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
        client.publish(central.topico_mqtt, '*' + dados.id + '%' + dados.comando + "~");
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
