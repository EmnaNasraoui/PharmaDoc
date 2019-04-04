let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PrescriptionSchema = new Schema({
    Date:{ type:Date,
        default:Date.now,
        required:true },
    Doctor_wr: { type:Schema.Types.ObjectId,
            ref:'User', 
            required:true },
    Patient_ex: { type:Schema.Types.ObjectId,
                ref:'User', 
                required:true },
    Product: {type:String,
            required:true}
})
module.exports = mongoose.model('Prescription',PrescriptionSchema);
