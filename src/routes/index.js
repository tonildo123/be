const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { 
        createUser,
        getAllUsers,
        findeUserById, 
        updateUserById, 
        deleteUserById, 
        findUserWithEmailAndPassword 
    } = require('../controllers/userController');
const { getAllProfile, createProfile, findeProfileById, findeProfileByUserId,updateProfileById, deleteProfileById } = require('../controllers/profileControler');
const { deletePetById, createPet, getAllPet, findePetById, updatePetById } = require('../controllers/petController');
const { createAddress, getAllAddress, findeAddressById, updateAddressById, deleteAddressById } = require('../controllers/addressController');
const { createHC, getAllHC, findeHCById, updateHCById, deleteHCById } = require('../controllers/historialClinical');
const { createOwn, getAllOwn, findeOwnById, updateOwnById, deleteOwnById } = require('../controllers/ownController');


// crud user
router.post("/create", createUser) // POST
router.post("/login", findUserWithEmailAndPassword) // POST
router.get("/users", getAllUsers)  // GET
router.get("/users/:id",findeUserById) // GET
router.put("/update/:id", updateUserById) // PUT
router.delete("/delete/:id",deleteUserById) // DELETE

// crud profile

router.post("/profile/create", upload.single('avatar'), createProfile) // POST
router.get("/profile/allusers", getAllProfile)  // GET
router.get("/profile/users/:id",findeProfileById) // GET
router.get("/profile/userId",findeProfileByUserId) // GET
router.put("/profile/update/:id", updateProfileById) // PUT
router.delete("/profile/delete/:id",deleteProfileById) // DELETE

// crud pet

router.post("/pet/create", createPet) // POST
router.get("/pet/users", getAllPet)  // GET
router.get("/pet/users/:id",findePetById) // GET
router.put("/pet/update/:id", updatePetById) // PUT
router.delete("/pet/delete/:id",deletePetById) // DELETE

// crud address

router.post("/address/create", createAddress) // POST
router.get("/address/users", getAllAddress)  // GET
router.get("/address/users/:id",findeAddressById) // GET
router.put("/address/update/:id", updateAddressById) // PUT
router.delete("/address/delete/:id",deleteAddressById) // DELETE

// hc
router.post("/clinicalhistory/create", createHC) // POST
router.get("/clinicalhistory/users", getAllHC)  // GET
router.get("/clinicalhistory/users/:id",findeHCById) // GET
router.put("/clinicalhistory/update/:id", updateHCById) // PUT
router.delete("/clinicalhistory/delete/:id",deleteHCById) // DELETE

// owns

router.post("/own/create", createOwn) // POST
router.get("/own/users", getAllOwn)  // GET
router.get("/own/users/:id",findeOwnById) // GET
router.put("/own/update/:id", updateOwnById) // PUT
router.delete("/own/delete/:id",deleteOwnById) // DELETE

module.exports = router;