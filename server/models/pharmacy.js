let mongoose = require('mongoose');


var PharmacySchema = new mongoose.Schema({

  Pharmacy_name: {
    type: String,

  },
  Schedule: [
    {
      day: { type: String },

      Time_Of_Opening: { type: String },

      Time_Of_Closing: { type: String }
    }
  ],
  partnership: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'PartnerShip'
    }
  ],

  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
