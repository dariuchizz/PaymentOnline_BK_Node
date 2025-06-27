require('dotenv').config();
const path = require('path');

// Importamos el servidor
const express = require('express');

const cors = require('cors');
const { dbConnection } = require('./database/config')

// Crear o inicializa el servidor EXPRESS
const app = express();

//Configurar CORS
app.use( cors() );

//Carpeta publica
app.use( express.static('public'));

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
app.use('/api/hospitales', require('./routes/hospitales_routes'));
app.use('/api/medicos', require('./routes/medicos_routes'));
app.use('/api/todo', require('./routes/busquedas_routes'));
app.use('/api/login', require('./routes/auth_routes'));
app.use('/api/upload', require('./routes/uploads_routes'));

//lo ultimo
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
})

// Levantamos el servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
