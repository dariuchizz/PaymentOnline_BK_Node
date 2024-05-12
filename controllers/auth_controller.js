const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt'); 
const { googleVerify } = require('../helpers/google-verify');

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
            ok: false,
            msg: 'Comuniquese con el administrador.'
        });
    }
}


const googleSignin = async(req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        var usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB)
        {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        }
        else {
            usuario = usuarioDB;
            //usuario.password = '@@';
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar Token - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email, name, picture,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto.'
        });
    }   
}

const renewToken = async (req, res = response) => {
    try 
    {
        console.log('Inicia metodo renewToken');
        const uid = req.uid;
        
        // generar un token
        const token = await generarJWT( uid );  
        
        //Obtener el usuario por UID
        const usuario = await Usuario.findById( uid );
        
        res.json({
        ok: true,
        token,
        usuario
    })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto.'
        });
    }    
}

module.exports = {
    login,
    googleSignin,
    renewToken
}