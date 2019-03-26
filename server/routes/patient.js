const router = require('express').Router();
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
var Pharmacy = require('../models/pharmacy');
var RDV = require('../models/RDV');
var user = require('../models/user')
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId;


router.post('/getRDV/:id_doctor', async (req,res)=>{
    let id = ObjectId(req.params.id_doctor);
    const result = await RDV.create(req.body).catch(err => err)
    const result1 = await Doctor.findByIdAndUpdate({_id:id},{$set:{All_Appointment:result._id}})
    res.send(result)
})

router.get('/get_list_doctor', async (req,res)=>{
        const result = await user.find({user_role: 'doctor'}).populate({path:'id_doctor',select:['specialty']}).catch(err => err)
    res.send(result)
})


router.get('/get_list_pharmacy', async (req,res)=>{
    const result = await user.find({user_role: 'pharmacy'}).populate({path:'id_pharmacy',select:['Time_Of_Opening','Time_Of_Closing']}).catch(err => err)
res.send(result)
})

router.get('/get_list_pharmacy_Doctor_Part/:id_doctor', async (req,res)=>{
    let id = ObjectId(req.params.id_doctor);
    const result = await Doctor.find({_id:id}).populate({path:'partnership',select:['Time_Of_Opening','Time_Of_Closing']}).catch(err => err)
res.send(result)
})


router.get('/get_list_Doctor_Pharmacy_Part/:id_pharmacy', async (req,res)=>{
    let id = ObjectId(req.params.id_pharmacy);
    const result = await Pharmacy.find({_id:id}).populate({path:'Pharmacy_Doctor',select:['specialty']}).catch(err => err)
res.send(result)
})


module.exports = router
