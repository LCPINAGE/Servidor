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
  topico_mqtt: {
    type: String,
    trim: true,
    required: 'topico_mqtt nao pode ficar em branco'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'user nao pode ficar em branco'
  }
});

mongoose.model('Central', CentralSchema);
