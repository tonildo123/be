const ClinicalHistorial = require('../models/clinicalHistory')
const mongoose = require('mongoose');

const createHC = async (req, res)=>{

    const {idUser, photo} = User(req.body)
    const hc =await ClinicalHistorial.findOne({idUser})

    try {

        if(hc){
            return res.status(400).json({
                message: "hc already exists",
                data:hc
            })
        } 
        const newHC = new User({idUser, photo})
        await newHC.save()
        res.status(200).json({
            message: "Pet created",
            data:newHC
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating pet",
            error: error
        })
        console.log('error al crear pet', error)
        
    }
    
}

const getAllHC = async (req, res)=>{

    await ClinicalHistorial.find()
        .then((hc)=>{
        res.status(200).json({
            message: "hcs found",
            data:hc
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting user",
            error: err
        })
    })
}

const findeHCById = async (req, res)=>{
    const {id} = req.params
    await ClinicalHistorial.findById(id)
        .then((hc)=>{
        res.status(200).json({
            message: "hc found",
            data:hc
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error finding pet",
            error: err
        })
    })
}

const updateHCById = async (req, res)=>{
    const {id} = req.params
    const {idUser, photo} = req.body;

    try {

        if(!mongoose.isValidObjectId(id)){
            return res.status(404)
                    .json({
                        message: "EL id no es valido",
                    })

        }

        // si es un Id valido 
        const hc = await ClinicalHistorial.findByIdAndUpdate(id, {idUser, photo}, {new:true})
        if(!hc){
            return res.status(404)
                    .json({
                        message: "EL hc no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:hc
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deleteHCById = async  (req, res)=>{
    const {id} = req.params
    await ClinicalHistorial
        .remove({_id:id})
        .then((hc)=>{
        res.status(200).json({
            message: "hc deleted",
            data:hc
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
    createHC, 
    getAllHC,
    findeHCById,
    updateHCById,
    deleteHCById, 
    
}