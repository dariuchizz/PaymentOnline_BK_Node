const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt'); 

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const crearUsuarios = async(req, res = response) => {

    console.log(req.body);
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado.'
            });
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();
    
        // generar un token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }    
}

const putUsuarios = async(req, res = response) => {
    
    // Validar TOKEN si es el usuario correcto

    const uid = req.params.id;
    try {
        
        const usuarioDb = await Usuario.findById( uid );
        if(!usuarioDb)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese id.'
            });
        }

        // Actualizar el usuario
        const { password, google, email, ...campos } = req.body;

        console.log('usuarioDbEmail: ' + usuarioDb.email);
        console.log('req: ' + email);
        
        if(usuarioDb.email === email) {           
        
            const existeEmail = await Usuario.findOne({ email });

            console.log('existeEmail: ' + existeEmail);

            campos.email = email;        
            const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
    
            res.json({
                ok: true,
                usuario: usuarioActualizado
            });

            // if( existeEmail ) {
            //     return res.status(400).json({
            //         ok: false,
            //         msg: 'Ya existe un usuario con ese email.'
            //     });
            // }
        }

       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }
}

const deleteUsuarios = async(req, res = response) => {
    
    const uid = req.params.id;
    
    try {

        const usuarioDb = await Usuario.findById( uid );
        if(!usuarioDb)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese id.'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }
}

module.exports = { 
    getUsuarios,
    crearUsuarios,
    putUsuarios,
    deleteUsuarios,
 }
