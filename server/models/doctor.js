let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DoctorSchema = new Schema({

  specialty: {
    type: String,
  },
  partnership: [{
    type: Schema.Types.ObjectId,
    ref: 'Pharmacy'
  }],
  All_Appointment: [{
    type: Schema.Types.ObjectId,
    ref: 'RDV'
  }]
})



module.exports = mongoose.model('Doctor', DoctorSchema);