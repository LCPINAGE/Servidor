'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * central Schema
 */
var CentralSchema = new Schema({
  nome: {
    type: String,
    default: '',
    trim: true,
    required: 'nome não pode ficar em branco'
  },
  descricao: {
    type: String,
    default: '',
    trim: true
  },
  canal_mqtt: {
    type: String,
    default: 'topico_mensura_in',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  dispositivos_conectados: [{
    type: Schema.ObjectId,
    ref: 'Dispositivos'
  }]
});

mongoose.model('Central', CentralSchema);
