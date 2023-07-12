const Own = require('../models/owns')
const mongoose = require('mongoose');

const createOwn = async (req, res)=>{

    const {idUser, object, photo} = User(req.body)
    const own =await Own.findOne({object})

    try {

        if(own){
            return res.status(400).json({
                message: "own already exists",
                data:own
            })
        } 
        const newOwn = new User({idUser, object, photo})
        await newOwn.save()
        res.status(200).json({
            message: "Pet created",
            data:newOwn
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating own",
            error: error
        })
        console.log('error al crear own', error)
        
    }
    
}

const getAllOwn = async (req, res)=>{

    await Own.find()
        .then((own)=>{
        res.status(200).json({
            message: "owns found",
            data:own
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting user",
            error: err
        })
    })
}

const findeOwnById = async (req, res)=>{
    const {id} = req.params
    await Own.findById(id)
        .then((own)=>{
        res.status(200).json({
            message: "own found",
            data:own
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error finding own",
            error: err
        })
    })
}

const updateOwnById = async (req, res)=>{
    const {id} = req.params
    const {object, photo} = req.body;

    try {

        if(!mongoose.isValidObjectId(id)){
            return res.status(404)
                    .json({
                        message: "EL id no es valido",
                    })

        }

        // si es un Id valido 
        const own = await Own.findByIdAndUpdate(id, {object, photo}, {new:true})
        if(!own){
            return res.status(404)
                    .json({
                        message: "EL own no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:own
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deleteOwnById = async  (req, res)=>{
    const {id} = req.params
    await Own
        .remove({_id:id})
        .then((own)=>{
        res.status(200).json({
            message: "own deleted",
            data:own
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
    createOwn, 
    getAllOwn,
    findeOwnById,
    updateOwnById,
    deleteOwnById, 
    
}