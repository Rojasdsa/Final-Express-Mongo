'use strict'

const express = require('express');
const router = express.Router();

/* INDEX */
router.get('/',(req, res) => {
  res.render('index', { titulo:'Bienvenido a GoT characters'});
})

/* CONTACTO*/
router.get('/contacto',(req, res) => {
  res.render('contacto', { tituloContacto:'Buzón de sugerencias'});
})

module.exports = router;