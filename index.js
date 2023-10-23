// Importamos el servidor
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../PaymentOnline_BK_Node/database/config')

// Crear o inicializa el servidor EXPRESS
const app = express();

//Configurar CORS
app.use( cors() );

//Base de datos
dbConnection();

console.log(process.env);

//usuario y clave DB MOngo
//user: admin_user
//pass: OK7WImzvxOGJIofo

// Rutas
app.get( '/', ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});


// Levantamos el servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
