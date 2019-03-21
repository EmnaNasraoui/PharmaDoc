let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PrescriptionSchema = new Schema({
    Date:{ type:Date,
        default:Date.now,
        required:true },
    Doctor_wr: { type:Schema.Types.ObjectId,
            ref:'User', 
            required:true },
    Product: {type:Schema.Types.ObjectId,
            ref:'Products',
            required:true},
    Pharmacy_part: {type:Schema.Types.ObjectId,
           ref:'Pharmacy' }

})
module.exports = mongoose.model('Prescription',PrescriptionSchema);
