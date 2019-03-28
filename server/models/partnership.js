let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let PartnerShipStatusEnum = require('../partnershipStatut').PartnerShipStatusEnum

var PartnerShipSchema = new Schema({

    Pharmacy: {
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy'
    },

    Doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },

    PartnerShip_Status: {
        type: Number,
        required: [true, 'course status is mandatory'],
        default: PartnerShipStatusEnum.get('pending').value,
        validate: [
          (v) => PartnerShipStatusEnum.isDefined(v),
          require('../partnershipStatut').errorMessage
        ]
      }
})



module.exports = mongoose.model('PartnerShip', PartnerShipSchema);