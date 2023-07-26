const ProfileData = require('../models/datauser')
const mongoose = require('mongoose');
require('dotenv').config()
const upload = require('../utils/multer');

// para el s3 de aws 
const aws = require('aws-sdk');
const uuid = require('uuid'); 
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,  
});



const s3 = new aws.S3({ region: 'sa-east-1' });  


const createProfile = async (req, res)=>{

    console.log('llega', req.body)

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
        
    const image = req.file; 
    if (!image) {
      return res.status(400).json({
        message: 'Image is required',
      });
    }
    const imageKey = uuid.v4();
   

      
        const params = {
            Bucket: 'ohmydogbucket', 
            Key: `${imageKey}.${path.split('.').pop()}`, 
            Body: require('fs').createReadStream(path), 
            ACL: 'public-read', 
            ContentType: req.file.mimetype, 
          };
    
        const  result = await s3.upload(params).promise();
 
    const avatarUrl = result.Location;

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

    const {id} = req.params
    await ProfileData.findById(id)
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

const findeProfileByUserId = async (req, res)=>{

    const {idUser} = ProfileData(req.body)

    console.log('idUSer ::::: >',  idUser)
    await ProfileData.findOne({idUser})
        .then((profile)=>{
        console.log(profile)    
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
    findeProfileByUserId,
    updateProfileById,
    deleteProfileById
}