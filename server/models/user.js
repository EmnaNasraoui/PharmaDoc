let mongoose = require('mongoose');
bcrypt = require('bcrypt-nodejs'),
SALT_WORK_FACTOR = 10;
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

    adresse: {
        type: String,
    
    },
    user_image : {type : String},

    user_role: {
        type: String,
        enum: ['doctor','pharmacy','patient']
      },
      id_doctor :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}],

      id_pharmacy :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy'}],

      id_patient :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}]
})

UserSchema.pre('save', function() {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password);
    console.log(this.password);
  }); 

  UserSchema.path('email').validate( (val)=> {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
  }, 'Valid E-mail please.');
module.exports = mongoose.model('User', UserSchema);