let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DoctorSchema = new Schema({

    specialty : {type:String,
                required:true},
    partnership: [{ type:Schema.Types.ObjectId,
                     ref:'Pharmacy'}]
})
module.exports=mongoose.model('Doctor',DoctorSchema);