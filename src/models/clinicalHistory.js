const mongoose = require('mongoose');

const clinicalHistorialSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ClinicalHistorial', clinicalHistorialSchema);
