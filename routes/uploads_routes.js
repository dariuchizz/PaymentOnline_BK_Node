/*
    Ruta: /api/upload/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt')
const { fileUpload } = require('../controllers/uploads_controller')
const { retornaImagen } = require('../controllers/uploads_controller')

const router = Router();

// default options
router.use(expressFileUpload());


router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);



module.exports = router;