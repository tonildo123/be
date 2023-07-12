const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    pickname: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    
});
module.exports = mongoose.model('Pet', petSchema);
