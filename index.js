// Importamos el servidor
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../PaymentOnline_BK_Node/database/config')

// Crear o inicializa el servidor EXPRESS
const app = express();

//Configurar CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

console.log(process.env);

//usuario y clave DB MOngo
//user: admin_user
//pass: OK7WImzvxOGJIofo

// Rutas
app.use('/api/usuarios', require('./routes/usuarios_routes'));
app.use('/api/login', require('./routes/auth_routes'));


// Levantamos el servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
