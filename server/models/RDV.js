let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RDVSchema = new Schema({
    Date: {
        type: Date,
        required: true
    },
    Doctor_avail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    RDV_Statut: {
        type: String,
        enum: ['0', '1']
    },


})
module.exports = mongoose.model('RDV', RDVSchema);
