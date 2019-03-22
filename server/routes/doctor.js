const router = require('express').Router()
var Doctor = require('../models/doctor');
  
router.post('/addDoctor', async (req,res)=>{
    const result = await Doctor.create(req.body).catch(err => err)
    res.send(result)
})

router.post('/editDoctor/:id', async (req,res)=>{
    const result = await Doctor.findByIdAndUpdate(req.params.id,{$set :req.body}).catch(err => err)
    res.send(result)
})
module.exports = router