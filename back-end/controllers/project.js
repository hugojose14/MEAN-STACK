'use strict'

//importando mi modelo
var Project = require('../models/project');
//libreria para eliminar un archivo
var fs = require('fs');
var controller = {

    home:function(req,res){
        return res.status(200).send({
            //enviar la respuesta
            message:"Soy la home"
        });
    },
    test:function(req,res){
        return res.status(200).send({
            //enviar la respuesta
            message:"Soy el metodo o accion test del controllador de project"
        });
    },
    saveProject:function (req,res){
        var project = new Project();

        //recoger los parametros que me llegan por el body
        var params = req.body; 
        project.name = params.name;
        project.descriptcion = params.descriptcion;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        //guardar el objeto en la base de datos
        project.save((err,projectStored)=>{
            if(err) return res.status(500).send({message:"Error el guardar"});
            if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el projecto"});

            //pasamos la propiedad project:
            return res.status(200).send({project: projectStored});

        });
        /*
        return res.status(200).send({
            //devolvemos el objeto project que le he puesto un valor a cada una de sus propiedades
            project:project,
            message: "Metodo saveProject"
        });
        */

    },
    //Que nos devuelva el objeto que le solicitemos por la url
    //Sacar un uni projecto de la base de datos
    getProject:function(req,res){

        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message:"el projecto no existe"});
        //utilizamos nuestro modelo (findById operacion de mongoose)
        Project.findById(projectId,(err,project)=>{

            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!project) return res.status(404).send({message:"el projecto no existe"});
            
            return res.status(200).send({
                project
            });
        });
    },

    //metodo para listar todos los projectos 
    getProjects:function(req,res){
        //Llamar nuestro Project
        Project.find({}).sort('-year').exec((err,projects) =>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!projects) return res.status(404).send({message:"el projecto no existe"});
            
            return res.status(200).send({
                //variable que lleva el array de todos los projectos
                projects
            });
        });

    },
    //Actualizar datos de un documento
    updateProject:function(req,res){
        //vamos a capturar el parametro que me llega por la url
        var projectId= req.params.id;
        //vamos a recoger todo el body de la  peticion (objeto con los datos actualizados de nuestro prjecto)
        var update = req.body;

        Project.findByIdAndUpdate(projectId,update,(err,projectUpdate)=>{
            if(err) return res.status(500).send({message:"Error al actualizar"});
            if(!projectUpdate) return res.status(404).send({message:"no existe el projecto para actualizar"});

            return res.status(200).send({
                //coloca el objeto y coloco el objeto que se va actualizar
                project: projectUpdate
            });
        });

    },

    deleteProject:function(req,res){
        var projectId= req.params.id;
        
        //utilizo mi modelo y utilizo el metodo
        Project.findByIdAndRemove(projectId,(err,projectRemoved)=>{
            if(err) return res.status.send(500)({message:"No se ha podido eliminar el projecto"});
            if(!projectRemoved) return res.status.send(404)({message:"No se puede eliminar este projecto"});

            //el projectRemoved lo envio en la propiedad project
            return res.status(200).send({project:projectRemoved});

        });
    },
    //Guardar un projecto y subir una imagen a ese projecto
    //Permitir que solo se suban imagenes y en caso que no sean imagenes borre el archivo de la carpeta
    uploadImage:function(req,res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        //recoger ficheros con un tipo de extension y en caso que no pertenezca a eso, enviar un mensaje diciendo que no es valido
        if(req.files){

            //vamos a sacar diferentes valores para guardar en la base de datos
            var filePath = req.files.image.path;
            //nombre real de archivo que se ha guardado en el disco duro (recorte)
            var fileSplit = filePath.split('\\');
            //Recogo el indice del archivo
            var fileName = fileSplit[1];
            //sacar la extension de nuestro archivo despues del punto
            var extSplit = fileName.split('\.');
            //antes del punto
            var fileExt = extSplit[1];
            if(fileExt == 'png' || fileExt== 'jpg' || fileExt=='jpeg' || fileExt == 'gif'){
                
                //pasarle la propiedad id para que la guarde
                Project.findByIdAndUpdate(projectId,{image: fileName},{new:true},(err,projectUpdate)=>{
        
                    if(err) return res.status(500).send({message:"La imagen no se ha subido"});
                    //no me llegue projectUpdate
                    if(!projectUpdate) return res.status(400).send({message:"El proyecto no existe y no se ha subido"});
                    return res.status(200).send({
                        //envio un objeto: lo que voy a devolver
                        //devuelvo projectUpdate con los valors que el tiene
                        project: projectUpdate
                    });
                });
                
            }else{
                //en caso que no yo voy a borrar ese archivo
                //utilizo la libreria file sistem le pao filePath para que lo borre
                fs.unlink(filePath,(err)=>{

                    return res.status(200).send.message({
                        message:"La extension no es valida"});
                });
            }

        }else{
            return res.status(200).send({
                message: fileName
            })
        }


    }

};
module.exports = controller;