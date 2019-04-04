const router = require('express').Router()
var Doctor = require('../models/doctor');
var Pharmacy = require('../models/pharmacy');
var Patient = require('../models/patient');
const multer = require("multer");
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'server/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });


router.post('/signup', upload.single('image'),async (req, res) =>{
  
    let lvl = 0;
    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const min = "abcdefghijklmnopqrstuvwxyz";
    let password = req.body.password;
    if (password.length >= 8 && password.length <= 20) {
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (number.includes(element)) {
          lvl++;
          break;
        }
      }
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (majus.includes(element)) {
          lvl++;
          break;
        }
      }
      for (let i = 0; i < password.length; i++) {
        const element = password[i];
        if (min.includes(element)) {
          lvl++;
          break;
        }
      }
      level = (lvl == 1) ? "easy" : (lvl == 2) ? "Soft" : (lvl == 3) ? "Hard" : "";
      console.log(level)
      const email = await User.findOne({email : req.body.email})
      if (req.body.user_role == 'doctor' && !email){
        const result = await Doctor.create(req.body).catch(err => err)
        let user = new User(req.body);
        user.id_doctor = result._id;
        const result2 = await User.create(user).catch(err => err)
        console.log(result2);
        const result3 = await Doctor.findByIdAndUpdate(result._id, {$set : {id_user:result2._id }})
        console.log(result3)
      res.send({ msg: result2 })
      }
      else{
        if (req.body.user_role == 'pharmacy' && !email){
          const result = await Pharmacy.create(req.body).catch(err => err)
          let user = new User(req.body);
          user.id_pharmacy = result._id;
          const result2 = await User.create(user).catch(err => err)
          const result3 = await Pharmacy.findByIdAndUpdate(result._id, {$set : {id_user:result2._id }})
        res.send({ msg: result2 })
        }
        else{
          if (req.body.user_role == 'patient' && !email){
            const result = await Patient.create(req.body).catch(err => err)
            let user = new User(req.body);
            user.id_patient = result._id;
            const result2 = await User.create(user).catch(err => err)
            const result3 = await Patient.findByIdAndUpdate(result._id, {$set : {id_user:result2._id }})
            console.log(result3)
          res.send({ msg: result2 })
          }
        }
      }
      
    }
    else {
      level = "Your password must contain at least 8 characters and less then 20";
      res.send(level)

    }
})

router.post('/login',async (req, res) =>{
    
    console.log(req.body.email);
    let Email = req.body.email;
    let Password = req.body.password
    const result = await User.findOne({ email: Email })
    console.log(result);
    if (result && bcrypt.compareSync(Password, result.password)) {
      const token = jwt.sign({id: result}, 'user');
        res.send( {lvl : 'Your connexion is valide', token:token});
    }
    else {
        res.send( {lvl : ' Please verify your Email or Password '});
    };
  
})
module.exports = router