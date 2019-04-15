const router = require('express').Router()
var Doctor = require('../models/doctor');
var RDV = require('../models/RDV');
var RDV = require('../models/RDV');
var User = require('../models/user')
var Prescription = require('../models/prescription');
var Partnership = require('../models/partnership');

let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId ; 



router.post('/addDoctor', async (req, res) => {
    const result = await Doctor.create(req.body).catch(err => err)
    res.send(result)
}) ;

router.post('/editDoctor/:id', async (req, res) => {
    const result = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body }).catch(err => err)
    res.send(result)
}) ;

router.post('/editDoctorTimes/:id', async (req, res) => {
    const result = await Doctor.findByIdAndUpdate(req.params.id, { $push:{ Schedule : req.body}}).catch(err => err)
    res.send(result)
})
router.post('/deleteaDoctor/:id_doctor', async (req, res) => {
    let id_doctor = { _id: ObjectId(req.params.id_doctor) }
    const result = await Doctor.findOneAndDelete(id_doctor).exec().catch(err => err)
    res.send(result);
}) ;

router.get('/getDoctor/:id_doctor', async (req, res) => {
    let id_doctor = { _id: ObjectId(req.params.id_doctor) }
    const result = await Doctor.findOne(id_doctor).populate({ path:'id_user', select: ['first_name', 'last_name','adresse','user_image','_id']}).exec().catch(err => err)
    console.log(result);
    res.send(result)
})

router.get('/getDoctors', async (req, res) => {
    const result = await Doctor.find().populate({ path:'id_user', select: ['first_name', 'last_name','adresse','user_image','_id']}).exec().catch(err => err)
    console.log(result);
    res.send(result)
}) ;

// router.get('/acceptRDV/:id_doctor/:id_RDV', async (req, res) => {
//     let id_doctor = { _id: ObjectId(req.params.id_doctor) }
//     let id_RDV = { _id: ObjectId(req.params.id_RDV) }
//    const result =  Doctor.findByIdAndUpdate(id_doctor, { $push: { All_Appointment: id_RDV } }).exec().catch(err => err)
//     RDV.findByIdAndUpdate(id_RDV, { $set: { RDV_Statut: '1' } }).exec().catch(err => err)
//     res.send(result)
// }) ;

// router.get('/rejectRDV/:id_RDV', async (req, res) => {
//     let id_RDV = { _id: ObjectId(req.params.id_RDV) }

//     RDV.findByIdAndUpdate(id_RDV, { $set: { RDV_Statut: 0 } }).catch(err => err)

//     console.log(result);
//     res.send(result)
// })

router.get('/listeRDV', async (req, res) => {

    const result = await RDV.find().exec().catch(err => err)
    res.send(result)
}) ;

router.post('/editRDV/:id_RDV', async (req, res) => {
    const result = await RDV.findByIdAndUpdate(req.params.id_RDV, { $set: req.body }).catch(err => err)
    res.send(result)
}) ;

router.post('/deleteaRDV/:id_RDV', async (req, res) => {
    let id_RDV = { _id: ObjectId(req.params.id_RDV) }
    const result = await RDV.findOneAndDelete(id_RDV).exec().catch(err => err)
    res.send(result);
}) ;

router.post('/partnerShipToValidate/:id_doctor/:id_pharmacy', async (req, res) => {

    PartnershipObject = {
        Pharmacy: req.params.id_pharmacy,
        Doctor: req.params.id_doctor
    }
    const add1 = await Partnership.create(PartnershipObject).catch(err => err)

    console.log(add1)
    res.send({ msg: add1 });

}) ;


router.post('/write_prescription/:id_doctor/:id_patient', async (req ,res) => {
    let id_doc = {_id: ObjectId(req.params.id_doctor)} ;
    let id_Pa = {_id: ObjectId(req.params.id_patient)} ;
let Data=new Prescription(req.body)
Data.Doctor_wr=id_doc;
Data.Patient_ex=id_Pa;
   
    const result = await Prescription.create(Data).catch(err => err)
    console.log(result._id)
    const result1 = await Prescription.find({_id:result._id}).populate([{path:'Doctor_wr',select:['first_name','last_name']},{path:'Patient_ex',select:['first_name','last_name']}]).exec().catch(err => err)
    res.send(result1);
}) ;



module.exports = router