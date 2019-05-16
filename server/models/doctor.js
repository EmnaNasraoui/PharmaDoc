let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DoctorSchema = new Schema({

    specialty: { type: String },
    partnership: [{
        type: Schema.Types.ObjectId,
        ref: 'PartnerShip'
    }],
    All_Appointment: [{
        type: Schema.Types.ObjectId,
        ref: 'RDV'
    }],
    Schedule: [
        {
            day: { type: String },

            Time_Of_Opening: { type: String },

            Time_Of_Closing: { type: String }
        }
    ],

    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})



module.exports = mongoose.model('Doctor', DoctorSchema);
