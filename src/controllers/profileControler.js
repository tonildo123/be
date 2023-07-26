const ProfileData = require('../models/datauser')
const mongoose = require('mongoose');
require('dotenv').config()
const upload = require('../utils/multer');

// para el s3 de aws 
const aws = require('aws-sdk');
const uuid = require('uuid'); // Para generar un nombre único para la imagen

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,  
});



const s3 = new aws.S3({ region: 'sa-east-1' }); // deberia ser zona de sao paulo 


const createProfile = async (req, res)=>{

    const {idUser, name, lastName, numberPhone} = ProfileData(req.body)
    const { path } = req.file;
    const profile =await ProfileData.findOne({idUser})

    console.log('Datos que llegan ' + '\nId : '+idUser+' \n name : ' + name+' \n lastName : ' + lastName+' \nnumberPhone : ' + numberPhone)
    console.log("imagen ", req.file)
    try {

        if(profile){
            return res.status(400).json({
                message: "Profile already exists",
                data:profile
            })
        } 
        // Extraer el contenido de la imagen y el tipo
    const image = req.file; // Suponiendo que la imagen se envía como parte de un formulario y se encuentra en el campo "file"
    if (!image) {
      return res.status(400).json({
        message: 'Image is required',
      });
    }

    // Generar un nombre único para la imagen
    const imageKey = uuid.v4();
    

    // Configurar el objeto de parámetros para subir la imagen a AWS S3
   

      
        const params = {
            Bucket: 'ohmydogbucket', // Reemplazar con el nombre de tu bucket de S3
            Key: `${imageKey}.${path.split('.').pop()}`, // Establecer el nombre del archivo con la extensión correcta
            Body: require('fs').createReadStream(path), // El contenido de la imagen
            ACL: 'public-read', // Permite que la imagen sea pública para que pueda ser accesible a través de una URL
            ContentType: req.file.mimetype, // Configurar el tipo de contenido adecuado según el tipo de imagen recibido
          };
    
        const  result = await s3.upload(params).promise();
 

    // Ahora puedes obtener la URL de la imagen subida desde result.Location
    const avatarUrl = result.Location;

    // Crear un nuevo perfil con la URL de la imagen
    const newUSer = new ProfileData({
      idUser,
      name,
      lastName,
      avatar: avatarUrl,
      numberPhone,
    });

        
        await newUSer.save()
        res.status(200).json({
            message: "Profile created",
            data:newUSer
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating profile",
            error: error
        })
        console.log('error al crear perfil',error)
        
    }
    
}

const getAllProfile = async (req, res)=>{

    await ProfileData.find()
        .then((profile)=>{
        res.status(200).json({
            message: "Profile found",
            data:profile
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting profile",
            error: err
        })
    })
}

const findeProfileById = async (req, res)=>{
    console.log('parametros ', req.params)

    const {idUser} = req.params
    // await ProfileData.findById(id) si funca solo para el Id 
    await ProfileData.findOne(idUser)
        .then((profile)=>{
        res.status(200).json({
            message: "profile found",
            data:profile
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error finding user",
            error: err
        })
    })
}

const updateProfileById = async (req, res)=>{
    const {id} = req.params
    const {name, lastName, avatar, numberPhone} = req.body;

    try {

        if(!mongoose.isValidObjectId(id)){
            return res.status(404)
                    .json({
                        message: "EL id no es valido",
                    })

        }

        // si es un Id valido 
        const profile = await ProfileData.findByIdAndUpdate(id, {name, lastName, avatar, numberPhone}, {new:true})
        if(!profile){
            return res.status(404)
                    .json({
                        message: "EL usuario no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:profile
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deleteProfileById = async  (req, res)=>{
    const {id} = req.params
    await ProfileData
        .remove({_id:id})
        .then((profile)=>{
        res.status(200).json({
            message: "profile deleted",
            data:profile
        })
    }
    )
    .catch((err)=>{
        res.status(500).json({
            message: "Error deleting user",
            error: err
        })
    })
}




module.exports = {
    createProfile, 
    getAllProfile,
    findeProfileById,
    updateProfileById,
    deleteProfileById
}