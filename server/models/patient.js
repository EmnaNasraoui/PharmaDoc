let mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({

    Appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RDV' }]

});

module.exports = mongoose.model('Patient', PatientSchema);
