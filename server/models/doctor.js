let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DoctorSchema = new Schema({

    specialty : {type:string,
                required:true},
    partnership: { type:Schema.Types.ObjectId,
                    required:true,
                     ref:'Pharmacy'}
})
module.exports=mongoose.model('Doctor',DoctorSchema);