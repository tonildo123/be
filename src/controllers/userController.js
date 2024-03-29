const User = require('../models/user');
const mongoose = require('mongoose');

const createUser = async (req, res)=>{

    const {email, password} = User(req.body)
    const user =await User.findOne({email})

    try {

        if(user){
            return res.status(400).json({
                message: "User already exists",
                data:user
            })
        } 
        const newUSer = new User({email, password})
        await newUSer.save()
        res.status(200).json({
            message: "User created",
            data:newUSer
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating user",
            error: error
        })
        console.log('error al crear usuario', error)
        
    }
    
}

const getAllUsers = async (req, res)=>{

    await User.find()
        .then((user)=>{
        res.status(200).json({
            message: "Users found",
            data:user
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error getting user",
            error: err
        })
    })
}

const findeUserById = async (req, res)=>{
    const {id} = req.params
    await User.findById(id)
        .then((user)=>{
        res.status(200).json({
            message: "User found",
            data:user
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "Error creating user",
            error: err
        })
    })
}

const updateUserById = async (req, res)=>{
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
        const user = await User.findByIdAndUpdate(id, {email, password}, {new:true})
        if(!user){
            return res.status(404)
                    .json({
                        message: "EL usuario no existe",
                    })
        }
        res.status(200).json({
            message: "Actualizado con exito!",
            data:user
        })

        
    } catch (error) {
        console.log('error al actualizar', error)
    }


}

const deleteUserById = async  (req, res)=>{
    const {id} = req.params
    await User
        .remove({_id:id})
        .then((user)=>{
        res.status(200).json({
            message: "User deleted",
            data:user
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

const findUserWithEmailAndPassword = async (req, res)=>{
    const {email, password} = req.body
    await User.findOne({email})
        .then((user)=>{
            console.log(user)
            if(password == user.password)
            {
                res.status(200).json({
                    message: "User found",
                    data:user
                })
            } else {
                res.status(201).json({
                    message: "Error de password",
                    data:user
                })
            }
        
    })
    .catch((err)=>{
        res.status(500).json({
            message: "No se encontro usuario",
            error: err
        })
    })
}


module.exports = {
    createUser, 
    getAllUsers,
    findeUserById,
    updateUserById,
    deleteUserById, 
    findUserWithEmailAndPassword
}