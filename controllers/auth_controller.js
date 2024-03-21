const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt'); 

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no válida.'
            });
        }

        // verificar contraseña
        const validPass = bcrypt.compareSync( password, usuarioDB.password );
        console.log(validPass);

        if( !validPass ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida.'
            });
        }

        // generar un token
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Comuniquese con el administrador.'
        });
    }
}


module.exports = {
    login
}