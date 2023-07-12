const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: false,
    },
    floor: {
        type: String,
        required: false,
    },
    locality: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: false,
    },
    longitude: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Address', addressSchema);
