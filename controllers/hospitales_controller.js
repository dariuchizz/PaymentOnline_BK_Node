const { response } = require('express');

const Hospital = require('../models/hospital');
const usuario = require('../models/usuario');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    try {
        res.json({
            ok: true,
            hospitales
        })    
    } catch (error) {
        
    }    
}

const crearHospitales = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
            usuario: uid,
        ...req.body
        });
    
    console.log(uid);

    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}

const actualizarHospitales = async (req, res = response) => {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findById( id );
        console.log(hospital);
        if( !hospital )
        {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el hospital',
                id
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: id
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            msg: '',
            hospital: hospitalActualizado
        })

        
    } catch (error) {
        console.log(error);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
          })  
    }    
}

const borrarHospitales = async (req, res = response) => {
    
    try {
    
        const id = req.params.id;
        const hospital = await Hospital.findById( id );
        
        if( !hospital )
        {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el hospital por el id',
                id
            })
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })

    } catch (error) {
        console.log(error);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
          })  
    }       
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}