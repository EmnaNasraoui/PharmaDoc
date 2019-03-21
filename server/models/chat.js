let mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    userOne : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    userTwo: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    messages : [{
      from : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
      to : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
      contenu : String,
      date: Date,
    }],

})

module.exports = mongoose.model('Chat', ChatSchema);