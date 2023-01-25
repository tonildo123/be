const express = require('express');
const router = express.Router();
const User = require('../models/user');

// create a user
router.post("/users", (req, res)=>{
    const user = User(req.body)
    user.save()
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
})

// get all users


router.get("/users", (req, res)=>{

    User.find()
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
})

// get a user by id
router.get("/users/:id", (req, res)=>{
    const {id} = req.params
    User.findById(id)
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
})


// update a user by id
router.put("/users/:id", (req, res)=>{
    const {id} = req.params
    const {name, age, email} = req.body;
    User.updateOne( {_id:id}, { $set: {name, age, email} } )
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
)

// delete a user by id
router.delete("/users/:id", (req, res)=>{
    const {id} = req.params
    User
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
)




module.exports = router;