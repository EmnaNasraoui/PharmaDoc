let mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({

    Appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RDV' }],
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id_Cart: { type: mongoose.Schema.Types.ObjectId, ref: 'MyCart' }


});

module.exports = mongoose.model('Patient', PatientSchema);
