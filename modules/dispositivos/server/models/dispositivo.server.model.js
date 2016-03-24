'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dispositivo Schema
 */
var DispositivoSchema = new Schema({
  nome: {
    type: String,
    default: '',
    trim: true,
    required: 'Nome não pode ficar em branco'
  },
  tipo: {
    type: String,
    default: '',
    required: 'Selecione o Tipo'
  },
  descricao: {
    type: String,
    default: '',
    trim: true
  },
  historico: [{
    type: Date,
    default: Date.now
  }],
  estado: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Dispositivo', DispositivoSchema);
