let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RDVSchema = new Schema({
    Date_rdv: {
        type: String,
        required: true
    },

    Doctor_avail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Patient_sik:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    RDV_Statut: {
        type: String,
        enum: ['0', '1'],
        default:'1'
    },


})
module.exports = mongoose.model('RDV', RDVSchema);
