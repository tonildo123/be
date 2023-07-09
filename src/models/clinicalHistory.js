const mongoose = require('mongoose');

const clinicalHistorialSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ClinicalHistorial', clinicalHistorialSchema);
