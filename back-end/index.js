'use strict'

//Llamo al modulo de mongoose
var mongoose = require('mongoose');
//indicarle donde está express (ruta actual/nombre del archivo) 
//cargando la configuracion de express
var app = require('./app');
//vamos a indicarle el puerto
var port = 3700;

mongoose.Promise= global.Promise;
//conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/Portafolio',{ useNewUrlParser: true })
        .then(()=>{
            console.log("La conexion a la base de datos exitosa...");

            //Creacion del servidor
            app.listen(port,()=>{
                console.log("Conexion existosa a la url: localhost:3700");
            })
        })
        //metodo para capturar el error
        .catch(err => console.log(err));

