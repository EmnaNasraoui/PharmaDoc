let mongoose = require('mongoose');


var PharmacySchema = new mongoose.Schema({

    Time_Of_Opening: {
        type: String,

    },

    Time_Of_Closing: {
        type: String,

    },

    Pharmacy_Doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],

});

module.exports = mongoose.model('Pharmacy', PharmacySchema);