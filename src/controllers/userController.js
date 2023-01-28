const User = require('../models/user');

const createUser = async (req, res)=>{

    const user = User(req.body)
    await user.save()
    .then((user)=>{
        res.status(200).json({
            message: "User created",
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
            message: "Error creating user",
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
    await User.updateOne( {_id:id}, { $set: {email, password} } )
        .then((user)=>{
        res.status(200).json({
            message: "User updated",
            data:user
        })
    }
    )
    .catch((err)=>{
        res.status(500).json({
            message: "Error updating user",
            error: err
        })
    })
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



module.exports = {
    createUser, 
    getAllUsers,
    findeUserById,
    updateUserById,
    deleteUserById

}