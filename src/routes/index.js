const express = require('express');
const router = express.Router();

const { createUser,
        getAllUsers,
        findeUserById, 
        updateUserById, 
        deleteUserById, 
        findUserWithEmailAndPassword 
    } = require('../controllers/userController');


// crud user
router.post("/create", createUser) // POST
router.post("/login", findUserWithEmailAndPassword) // POST
router.get("/users", getAllUsers)  // GET
router.get("/users/:id",findeUserById) // GET
router.put("/update/:id", updateUserById) // PUT
router.delete("/delete/:id",deleteUserById) // DELETE



module.exports = router;