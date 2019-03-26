const router = require('express').Router()
var Doctor = require('../models/doctor');
var RDV = require('../models/RDV');
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId



router.post('/addDoctor', async (req, res) => {
    const result = await Doctor.create(req.body).catch(err => err)
    res.send(result)
})

router.post('/editDoctor/:id', async (req, res) => {
    const result = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body }).catch(err => err)
    res.send(result)
})

router.post('/deleteaDoctor/:id_doctor', async (req, res) => {
    let id_doctor = { _id: ObjectId(req.params.id_doctor) }
    const result = await Doctor.findOneAndDelete(id_doctor).exec().catch(err => err)
    res.send(result);
})

router.get('/getDoctor/:id_doctor', async (req, res) => {
    let id_doctor = { _id: ObjectId(req.params.id_doctor) }
    const result = await Doctor.findOne(id_doctor).exec().catch(err => err)
    console.log(result);
    res.send(result)
})

router.get('/acceptRDV/:id_doctor/:id_RDV', async (req, res) => {
    let id_doctor = { _id: ObjectId(req.params.id_doctor) }
    let id_RDV = { _id: ObjectId(req.params.id_RDV) }

    Doctor.findByIdAndUpdate(id_doctor, { $set: { RDV: id_RDV } }).catch(err => err)
    RDV.findByIdAndUpdate(id_RDV, { $set: { RDV_Statut: 1 } }).catch(err => err)

    console.log(result);
    res.send(result)
})

router.get('/rejectRDV/:id_RDV', async (req, res) => {
    let id_RDV = { _id: ObjectId(req.params.id_RDV) }

    RDV.findByIdAndUpdate(id_RDV, { $set: { RDV_Statut: 0 } }).catch(err => err)

    console.log(result);
    res.send(result)
})

router.get('/listeRDV', async (req, res) => {

    const result = await RDV.find().exec().catch(err => err)
    res.send(result)
})

router.post('/editRDV/:id_RDV', async (req, res) => {
    const result = await RDV.findByIdAndUpdate(req.params.id_RDV, { $set: req.body }).catch(err => err)
    res.send(result)
})

router.post('/deleteaRDV/:id_RDV', async (req, res) => {
    let id_RDV = { _id: ObjectId(req.params.id_RDV) }
    const result = await RDV.findOneAndDelete(id_RDV).exec().catch(err => err)
    res.send(result);
})





module.exports = router