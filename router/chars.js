
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
    const { nombre, casa, estado, edad, titulo } = req.body; // Destructuramos los campos que esperamos
    console.log(id);
    console.log('body', req.body);

    try {
        const updatedChar = await Personaje.findByIdAndUpdate(
            id,
            { nombre, casa, estado, edad, titulo }, // Solo actualizamos los campos esperados
            { useFindAndModify: false, new: true } // El parámetro new: true devuelve el documento actualizado
        );
        console.log(updatedChar);
        if (updatedChar) {
            res.json({
                estado: true,
                mensaje: 'Personaje editado'
            });
        } else {
            res.json({
                estado: false,
                mensaje: 'No se encontró el personaje para editar'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Problema al editar el personaje'
        });
    }
});


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