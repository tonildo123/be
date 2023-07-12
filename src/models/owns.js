const mongoose = require('mongoose');

const ownSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    object: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Own', ownSchema);
