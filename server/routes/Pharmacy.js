const router = require('express').Router()
var Pharmacy = require('../models/pharmacy');
var Doctor = require('../models/doctor');
var Partnership = require('../models/partnership');
var Product = require('../models/products');
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId ;


router.post('/addPharmacy', async (req,res)=>{
    const result = await Pharmacy.create(req.body).catch(err => err)
    res.send(result)
}) ;

router.post('/editPharmacy/:id', async (req, res) => {
    const result = await Pharmacy.findByIdAndUpdate(req.params.id, { $set: req.body }).catch(err => err)
    res.send(result)
}) ;

router.post('/ValidatePartnership/:id_pharmacy/:id_doctor/:id_partnership', async (req, res) => {
    let Id_pharmacy = { _id: ObjectId(req.params.id_pharmacy) }
    let Id_doctor = { _id: ObjectId(req.params.id_doctor) }
    let Id_Partnership = { _id: ObjectId(req.params.id_partnership) }

    const result = await Pharmacy.findByIdAndUpdate(req.params.id_pharmacy, { $set: { Pharmacy_Doctor: Id_doctor } }).exec().catch(err => err)
    const results = await Doctor.findByIdAndUpdate(req.params.id_doctor, { $set: { partnership: Id_pharmacy } }).exec().catch(err => err)
    const result2 = await Partnership.findByIdAndUpdate(req.params.id_partnership,{$set: { PartnerShip_Status : 2 } }).exec().catch(err => err)

    res.send({ msg: result, message: results, aa : result2 })
}) ;

router.post('/RejectPartnership/:id_partnership', async (req, res) => { 
    const result2 = await Partnership.findByIdAndUpdate(req.params.id_partnership,{$set: { PartnerShip_Status : 3 } }).exec().catch(err => err)
    res.send({message: result2 })
}) ; 

router.post('/deleteaPartnership/:id_pharmacy/:id_doctor', async (req, res) => {
    let Id_pharmacy = ObjectId(req.params.id_pharmacy)
    let Id_doctor = ObjectId(req.params.id_doctor)
    const result = await Pharmacy.updateOne({ $pull: { Pharmacy_Doctor: Id_doctor } }).exec().catch(err => err)
    const results = await Doctor.updateOne({ $pull: { partnership: Id_pharmacy } }).exec().catch(err => err)
    res.send({ msg: result, message: results})
}) ;  

router.post('/addProduct', async (req,res)=>{
    const result = await Product.create(req.body).catch(err => err)
    res.send(result)
}) ;

module.exports = router 