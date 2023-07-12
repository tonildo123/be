const ProfileData = require('../models/datauser')
const mongoose = require('mongoose');

const createProfile = async (req, res)=>{

    const {idUser, name, lastName, avatar, numberPhone} = ProfileData(req.body)
    const profile =await ProfileData.findOne({idUser})

    try {

        if(profile){
            return res.status(400).json({
                message: "Profile already exists",
                data:profile
            })
        } 
        const newUSer = new User({idUser, name, lastName, avatar, numberPhone})
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
        console.log('error al crear perfil', error)
        
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
            message: "Error creating user",
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