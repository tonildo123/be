const Address = require('../models/address');
const mongoose = require('mongoose');

const createAddress = async (req, res)=>{


    const {idUser,
        street,
        number,
        department,
        floor,
        locality,
        province,
        country,
        latitude,
        longitude} = Address(req.body)
    const address = await Address.findOne({idUser})

    try {

        if(address){
            return res.status(400).json({
                message: "address already exists",
                data:address
            })
        } 
        const newAddress= new Address({idUser,
            street,
            number,
            department,
            floor,
            locality,
            province,
            country,
            latitude,
            longitude})
        await newAddress.save()
        res.status(200).json({
            message: "User created",
            data:newAddress
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating address",
            error: error
        })
        console.log('error al crear address ', error)
        
    }
    
}

const getAllAddress = async (req, res)=>{

    await Address.find()
        .then((address)=>{
        res.status(200).json({
            message: "address found",
            data:address
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting address",
            error: err
        })
    })
}

const findeAddressById = async (req, res)=>{
    const {id} = req.params
    await Address.findById(id)
        .then((address)=>{
        res.status(200).json({
            message: "address found",
            data:address
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error creating user",
            error: err
        })
    })
}

const updateAddressById = async (req, res)=>{
    const {id} = req.params
    const {email, password} = req.body;

    try {

        if(!mongoose.isValidObjectId(id)){
            return res.status(404)
                    .json({
                        message: "EL id no es valido",
                    })

        }

        // si es un Id valido 
        const address = await Address.findByIdAndUpdate(id, {idUser,
            street,
            number,
            department,
            floor,
            locality,
            province,
            country,
            latitude,
            longitude}, {new:true})
        if(!address){
            return res.status(404)
                    .json({
                        message: "EL address no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:address
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deleteAddressById = async  (req, res)=>{
    const {id} = req.params
    await Address
        .remove({_id:id})
        .then((address)=>{
        res.status(200).json({
            message: "address deleted",
            data:address
        })
    }
    )
    .catch((err)=>{
        res.status(500).json({
            message: "Error deleting address",
            error: err
        })
    })
}


module.exports = {
    createAddress, 
    getAllAddress,
    findeAddressById,
    updateAddressById,
    deleteAddressById,
}