/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login, googleSignin, renewToken } = require('../controllers/auth_controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().notEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().notEmpty(),
        validarCampos
    ],
    googleSignin
)

router.get('/renew',
    validarJWT,
    renewToken
)

module.exports = router;
