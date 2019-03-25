const router = require('express').Router()
var Pharmacy = require('../models/pharmacy');
var Doctor = require('../models/doctor');
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId ;
router.post('/addPharmacy', async (req,res)=>{
    const result = await Pharmacy.create(req.body).catch(err => err)
    res.send(result)
})

router.post('/editPharmacy/:id', async (req,res)=>{
    const result = await Pharmacy.findByIdAndUpdate(req.params.id,{$set :req.body}).catch(err => err)
    res.send(result)
})
router.post('/addaPartnership/:id_pharmacy/:id_doctor',async(req,res)=>{
    let Id_pharmacy = {_id : ObjectId(req.params.id_pharmacy)}
    let Id_doctor = {_id : ObjectId(req.params.id_doctor)}
const result = await Pharmacy.findByIdAndUpdate(req.params.id_pharmacy,{$set : {Pharmacy_Doctor :Id_doctor} }).exec().catch(err => err)
const results = await Doctor.findByIdAndUpdate(req.params.id_doctor,{$set :{partnership : Id_pharmacy }}).exec().catch(err => err)

res.send({msg :result, message :results})
})

router.post('/deleteaPartnership/:id_pharmacy/:id_doctor',async(req,res)=>{
    let Id_pharmacy =  ObjectId(req.params.id_pharmacy)
    let Id_doctor =  ObjectId(req.params.id_doctor)
const result = await Pharmacy.updateOne({$pull : {Pharmacy_Doctor :Id_doctor} }).exec().catch(err => err)
const results = await Doctor.updateOne({$pull :{partnership : Id_pharmacy }}).exec().catch(err => err)

res.send({msg :result, message :results})
})
module.exports = router