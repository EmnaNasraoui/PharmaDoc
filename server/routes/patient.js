const router = require('express').Router();
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
var RDV = require('../models/RDV');
var User = require('../models/user')
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId;

router.post('/addPatient', async (req,res)=>{
    const result = await Patient.create(req.body).catch(err => err)
    res.send(result)
})


router.post('/getRDV/:id_doctor', async (req,res)=>{
    let id = ObjectId(req.params.id_doctor);
    const result = await RDV.create(req.body).catch(err => err)
    const result1 = await Doctor.findByIdAndUpdate({_id:id},{$set:{All_Appointment:result._id}})
    res.send(result)
})

router.get('/get_list_doctor', async (req,res)=>{
        const result = await User.find({}).populate({path:'id_doctor',select:['specialty']}).exec().catch(err => err)
    res.send(result)
})


module.exports = router
