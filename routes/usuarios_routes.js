/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios_controller');
const { validarJWT, validar_ROLE, validarADMIN_ROLE_O_MISMOUSUARIO } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        validarCampos,
    ], 
    crearUsuarios);

router.put('/:id',
    [
        validarJWT,
        validarADMIN_ROLE_O_MISMOUSUARIO,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),        
        check('email', 'El email es obligatorio.').isEmail(),
        check('role', 'El rol es obligatorio.').not().isEmpty(),
        validarCampos,
    ],
    putUsuarios);

router.delete('/:id', 
    [ validarJWT, validar_ROLE ],
    deleteUsuarios
    );


module.exports = router;