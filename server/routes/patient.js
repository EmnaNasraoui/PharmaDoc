const router = require('express').Router();
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
var Pharmacy = require('../models/pharmacy');
var RDV = require('../models/RDV');
var Products = require('../models/products');
var user = require('../models/user')
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId;


router.post('/getRDV/:id_doctor/:id_patient', async (req,res)=>{
    let id_D = ObjectId(req.params.id_doctor)  ;
    let id_P = ObjectId(req.params.id_patient) ;
let data = new RDV(req.body);
    data.Doctor_avail = id_D ;
    data.Patient_sik = id_P ;
    const result = await RDV.create(data).catch(err => err)
    console.log(result._id)
    let ID = result._id;
    const result1 = await Doctor.findByIdAndUpdate({_id:id_D},{ $push:{ All_Appointment:ObjectId(ID) }}).exec().catch(err => err)
    res.send(result)
}) ;

router.get('/get_list_patient', async (req,res)=>{
        const result = await user.find({user_role: 'patient'}).populate({path:'id_patient',select:['first_name','last_name']}).catch(err => err)
    res.send(result)
}) ;


router.get('/get_list_doctor', async (req,res)=>{
  const result = await user.find({user_role: 'doctor'}).populate({path:'id_doctor',select:['specialty']}).catch(err => err)
res.send(result)
}) ;


router.get('/get_doctor/:id_doctor', async (req,res)=>{
  let Doctor_ID = ObjectId(req.params.id_doctor)  ;
  const result = await user.find({id_doctor:Doctor_ID}).populate({path:'id_doctor',select:['specialty']}).catch(err => err)
res.send(result)
}) ;



router.get('/get_list_pharmacy', async (req,res)=>{
    const result = await user.find({user_role: 'pharmacy'}).populate({path:'id_pharmacy',select:['Time_Of_Opening','Time_Of_Closing']}).catch(err => err)
res.send(result)
}) ;
/////////////////////////

router.get('/get_list_pharmacy_Doctor_Part/:id_doctor', async (req,res)=>{
    let id = ObjectId(req.params.id_doctor);
    const result = await Doctor.findById({_id:id}).populate({path:'partnership',select:['Time_Of_Opening','Time_Of_Closing']}).catch(err => err)
res.send(result)
}) ;

//////////////////
router.get('/get_list_Doctor_Pharmacy_Part/:id_pharmacy', async (req,res)=>{
    let id = ObjectId(req.params.id_pharmacy);
    const result = await Pharmacy.findById({_id:id}).populate({path:'Pharmacy_Doctor',select:['specialty']}).catch(err => err)
res.send(result)
}) ;


router.get('/get_product/:id_product/:numb_product', async (req,res)=>{
    let id = ObjectId(req.params.id_product);
    let numb = req.params.numb_product
    let result = await Products.findById({_id:id}).catch(err => err)
    if (numb<=result.Amount) {
        let  qunt = result.Amount-numb;
    const result1 = await Products.findByIdAndUpdate({_id:id},{$set:{Amount:qunt}}).catch(err => err)
    }
    else{
        result="amount not availabale"
    }


res.send(result)
}) ;


module.exports = router
