let mongoose = require('mongoose');


var PharmacySchema = new mongoose.Schema({

    Time_Of_Opening: {
        type: String,

    },

    Time_Of_Closing: {
        type: String,

    },

    Pharmacy_Doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Pharmacy', PharmacySchema);