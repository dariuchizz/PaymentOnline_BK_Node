const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    console.log('getMedicos');
    const medicos = await Medico.find()
                                        .populate('usuario', 'nombre email')
                                        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
}

const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
        const medico = new Medico({
            usuario: uid,
            ...req.body
        });

    try {
        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medico: medicoBD
        })   

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
    
}

const actualizarMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const borrarMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}