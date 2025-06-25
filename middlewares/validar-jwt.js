const jwt = require( 'jsonwebtoken' );
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');
    console.log(token);

    if( !token )
    {

        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        console.log('Token válido, uid: ' + uid);
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido.'
        });
    }    
}

const validar_ROLE = async(req, res, next) => {

    const uid = req.uid;
    try {
        
        const usuarioDB = await usuario.findById(uid);
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if( usuarioDB.role !== 'ADMIN_ROLE')
        {
            return res.status(403).json({
                                        ok: false,
                                        msg: 'El usuario no posee privilegios.'
                        })
        }
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarADMIN_ROLE_O_MISMOUSUARIO = async(req, res, next) => {

    const uid = req.uid;

    //id que quiero actualizar
    const id = req.params.id;

    try {
        
        const usuarioDB = await usuario.findById(uid);
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if( usuarioDB.role === 'ADMIN_ROLE' || uid === id)
        {
            next();
        }
        else
        {
            return res.status(403).json({
                                        ok: false,
                                        msg: 'El usuario no posee privilegios.'
                        })
        }
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    validar_ROLE,
    validarADMIN_ROLE_O_MISMOUSUARIO
}