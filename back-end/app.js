//peticiones y el body-parser 
'use strict'

//cargando el modulo express (objeto)
var express = require('express');
//cargando el modulo bodyParser (objeto)
var bodyParser= require('body-parser');
//aqui ejecuto express
var app = express();

//cargar archivos de rutas
var project_routes = require('./routes/project')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//rutas
//crear el middleware (sobrescribir eso)
//las rutas que he creado le he agregado un segmeneto delante
app.use('/api',project_routes);

//exportar
module.exports = app;