let mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
   
    first_name: {
        type: String
    },
   
    last_name: {
        type: String

    },
   
    email: {
        type: String,
        unique: true
    },
  
   password: {
        type: String,
    

    },
    user_role: {
        type: Number,
        required: [true, 'user role is mandatory'],
        validate: [
          (v) => userRoleEnum.isDefined(v),
          require('../UserRole').errorMessage
        ]
      }
})
module.exports = mongoose.model('User', UserSchema);