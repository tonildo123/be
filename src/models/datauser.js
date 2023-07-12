const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    idUser: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    numberPhone: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('ProfileData', dataSchema);