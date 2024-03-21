/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth_controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().notEmpty(),
        validarCampos
    ],
    login
)



module.exports = router;
