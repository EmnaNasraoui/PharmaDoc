let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RDVSchema = new Schema({
    Date:{type:Date,
        required:true},
    Doctor_avail:{type:Schema.Types.ObjectId,
                ref:'User'
                }
    
})
module.exports = mongoose.model('RDV',RDVSchema);
