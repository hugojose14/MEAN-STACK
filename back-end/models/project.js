'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//objeto molde que voy a estár utilizando para crear nuevos objetos de este tipo
var ProjectSchema = Schema({
    //propiedades que debe tener ese objeto
    name: String,
    description: String,
    category:String,
    year: Number,
    langs:String,
    image: String

})

//para exportar este modelo y trabajarlo fuera de este fichero
//Nombre de mi modelo y el schema
module.exports = mongoose.model('Project', ProjectSchema);
//projects -> guarda los documentos en la coleccion