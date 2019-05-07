let mongoose = require('mongoose');
let Schema = mongoose.Schema
var Chats= new Schema({
    userOne : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    userTwo: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    messages : [{
      user : {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
      content : String,
      date:{type: Date, default: Date.now()}
    }],

})

module.exports = mongoose.model('Chat', Chats);
