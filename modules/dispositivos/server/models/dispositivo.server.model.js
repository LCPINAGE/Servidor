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
    type: String
  }],
  estado: {
    type: Boolean,
    default: false
  },
  central: {
    type: Schema.ObjectId,
    ref: 'Central',
    required: 'Selecione uma central'
  },
  id_disp_central: {
    type: Number,
    required: 'Erro ao salvar ID'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Dispositivo', DispositivoSchema);
