const Pet = require('../models/pets')
const mongoose = require('mongoose');

const createPet = async (req, res)=>{

    const {idUser, pickname, photo} = User(req.body)
    const pets =await Pet.findOne({pickname})

    try {

        if(pets){
            return res.status(400).json({
                message: "pets already exists",
                data:pets
            })
        } 
        const newPet = new User({idUser, pickname, photo})
        await newPet.save()
        res.status(200).json({
            message: "Pet created",
            data:newPet
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating pet",
            error: error
        })
        console.log('error al crear pet', error)
        
    }
    
}

const getAllPet = async (req, res)=>{

    await Pet.find()
        .then((pet)=>{
        res.status(200).json({
            message: "pets found",
            data:pet
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting user",
            error: err
        })
    })
}

const findePetById = async (req, res)=>{
    const {id} = req.params
    await Pet.findById(id)
        .then((pet)=>{
        res.status(200).json({
            message: "pet found",
            data:pet
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error finding pet",
            error: err
        })
    })
}

const updatePetById = async (req, res)=>{
    const {id} = req.params
    const {pickname, photo} = req.body;

    try {

        if(!mongoose.isValidObjectId(id)){
            return res.status(404)
                    .json({
                        message: "EL id no es valido",
                    })

        }

        // si es un Id valido 
        const pet = await Pet.findByIdAndUpdate(id, {pickname, photo}, {new:true})
        if(!pet){
            return res.status(404)
                    .json({
                        message: "EL pet no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:pet
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deletePetById = async  (req, res)=>{
    const {id} = req.params
    await Pet
        .remove({_id:id})
        .then((pet)=>{
        res.status(200).json({
            message: "pet deleted",
            data:pet
        })
    }
    )
    .catch((err)=>{
        res.status(500).json({
            message: "Error deleting pet",
            error: err
        })
    })
}




module.exports = {
    createPet, 
    getAllPet,
    findePetById,
    updatePetById,
    deletePetById, 
    
}