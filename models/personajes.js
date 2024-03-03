'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gotSchema = new Schema({
    nombre: String,
    casa: String,
    estado: String,
    edad: String,
    titulo: String
})

// Creamos el modelo
const Personaje = mongoose.model('character',gotSchema, "Personajes");

module.exports = Personaje;