
const express = require('express');
const router = express.Router();
const Personaje = require('../models/personajes.js');

router.get('/', async (req, res) => {

    try {
        const charsDB = await Personaje.find();
        console.log(charsDB);
        res.render("chars", {
            arrayChar: charsDB
        })

    } catch (error) {
        console.error(error)
    }
})

// RUTA CREAR PERSONAJE
router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const charsDB = new Personaje(body)
        await charsDB.save()
        res.redirect('/chars')
    } catch (error) {
        console.log('error', error)
    }
})

// RUTA EDITAR PERSONAJE
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const charsDB = await Personaje.findOne({ _id: id })
        console.log(charsDB)
        res.render('detalle', {
            char: charsDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Personaje no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)

    try{
        const charsDB = await Personaje.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        console.log(charsDB)
        res.json({
            estado: true,
            mensaje: 'Personaje editado'
        })
    } catch (error){
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el personaje'
        })
    }
})

// RUTA ELIMINAR PERSONAJE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('_id desde backend', id)
    try {
        const charsDB = await Personaje.findByIdAndDelete({ _id: id });
        console.log(charsDB)

        if (!charsDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el personaje.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Personaje eliminado'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;