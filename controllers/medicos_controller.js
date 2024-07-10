const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    
    const medicos = await Medico.find()
                                        .populate('usuario', 'nombre email')
                                        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
}

const getMedicoById = async (req, res = response) => {

    try
    {
        const id = req.params.id;
        const medico = await Medico.findById(id)
                                            .populate('usuario', 'nombre email')
                                            .populate('hospital', 'nombre img');
    
        res.json({
            ok: true,
            medico
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }    
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

const actualizarMedicos = async (req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById( id );
        
        if( !medico )
        {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }
        
        const cambioMedico = {
            ...req.body,
            medico: id
        };

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambioMedico, {new:true} );

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        })
            
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador.'
        })
    }   
}

const borrarMedicos = async (req, res = response) => {

    const id = req.params.id;
    console.log(id);

    try {
        const medico = await Medico.findById( id );
        console.log(medico);
        
        if( !medico )
        {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }
        
        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador.'
        })
    }    
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
}