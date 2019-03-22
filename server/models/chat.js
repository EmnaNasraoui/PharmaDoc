let mongoose = require('mongoose');
let Schema = mongoose.Schema
var Chats= new Schema({
    userOne : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    userTwo: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    messages : [{
      from : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
      to : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
      contenu : String,
      date: Date,
    }],

})

module.exports = mongoose.model('Chat', Chats);