const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// getTodo
const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales    
    });
}

// 
const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    console.log('tabla: ' + tabla);
    console.log('busqueda: ' + busqueda);
    let data = [];

    switch( tabla ){
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });           
        break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuario/medicos/hospitales'
            });
        break;
    }
    console.log(data);
    res.json({
        ok: true,
        resultado: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}