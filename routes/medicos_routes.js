/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
} = require('../controllers/medicos_controller')

const router = Router();

router.get('/', getMedicos);

router.post('/', 
    [    
        validarJWT,
        check('nombre', 'El nombre del médico es requerido.').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido.').isMongoId(),
        validarCampos    
    ], 
    crearMedicos);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es requerido.').not().isEmpty(),        
        validarCampos    
    ],
    actualizarMedicos);

router.delete('/:id', 
    [
        validarJWT,
    ],
    borrarMedicos
    );


module.exports = router;