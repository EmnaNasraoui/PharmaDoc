const router = require('express').Router()
var Pharmacy = require('../models/pharmacy');
  
router.post('/addPharmacy', async (req,res)=>{
    const result = await Pharmacy.create(req.body).catch(err => err)
    res.send(result)
})

router.post('/editPharmacy/:id', async (req,res)=>{
    const result = await Pharmacy.findByIdAndUpdate(req.params.id,{$set :req.body}).catch(err => err)
    res.send(result)
})
module.exports = router