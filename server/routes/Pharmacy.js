const router = require('express').Router()
var Pharmacy = require('../models/pharmacy');
var Doctor = require('../models/doctor');
var User = require('../models/user');
var Partnership = require('../models/partnership');
var Product = require('../models/products');
var MyCart = require('../models/MyCart')
let Mongoose = require('mongoose');
let ObjectId = Mongoose.Types.ObjectId;

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

router.post('/addPharmacy', async (req, res) => {
  const result = await Pharmacy.create(req.body).catch(err => err)
  res.send(result)
});

router.post('/editPharmacy/:id', async (req, res) => {
  const result = await Pharmacy.findByIdAndUpdate(req.params.id, { $set: req.body }).catch(err => err)
  res.send(result)
})
router.post('/editPharmacyTimes/:id', async (req, res) => {
  const result = await Pharmacy.findByIdAndUpdate(req.params.id, { $push: { Schedule: req.body } }).catch(err => err)
  res.send(result)
})

router.get('/getPharmacyById/:id_pharmacy', async (req, res) => {
  let Id_pharmacy = { _id: ObjectId(req.params.id_pharmacy) }
  const result = await User.findOne({ id_pharmacy: Id_pharmacy }).populate({ path: 'id_pharmacy', select: ['Schedule', 'Pharmacy_name'] }).catch(err => err)
  res.send(result)
})

router.post('/ValidatePartnership/:id_pharmacy/:id_doctor/:id_partnership', async (req, res) => {
  let Id_pharmacy = { _id: ObjectId(req.params.id_pharmacy) }
  let Id_doctor = { _id: ObjectId(req.params.id_doctor) }
  let Id_Partnership = { _id: ObjectId(req.params.id_partnership) }

  const result = await Pharmacy.findByIdAndUpdate(req.params.id_pharmacy, { $set: { Pharmacy_Doctor: Id_doctor } }).exec().catch(err => err)
  const results = await Doctor.findByIdAndUpdate(req.params.id_doctor, { $set: { partnership: Id_pharmacy } }).exec().catch(err => err)
  const result2 = await Partnership.findByIdAndUpdate(req.params.id_partnership, { $set: { PartnerShip_Status: 2 } }).exec().catch(err => err)

  res.send({ msg: result, message: results, aa: result2 })
});

router.post('/RejectPartnership/:id_partnership', async (req, res) => {
  const result2 = await Partnership.findByIdAndUpdate(req.params.id_partnership, { $set: { PartnerShip_Status: 3 } }).exec().catch(err => err)
  res.send({ message: result2 })
});

router.post('/deleteaPartnership/:id_pharmacy/:id_doctor', async (req, res) => {
  let Id_pharmacy = ObjectId(req.params.id_pharmacy)
  let Id_doctor = ObjectId(req.params.id_doctor)
  const result = await Pharmacy.updateOne({ $pull: { Pharmacy_Doctor: Id_doctor } }).exec().catch(err => err)
  const results = await Doctor.updateOne({ $pull: { partnership: Id_pharmacy } }).exec().catch(err => err)
  res.send({ msg: result, message: results })
});

router.post('/addProduct/:id_pharmacy', upload.single('image'), async (req, res) => {
  req.body.Product_Pharmacy = req.params.id_pharmacy;
  const result = await Product.create(req.body).catch(err => err)
  res.send(result)
});

router.get('/getProductById/:id_pharmacy', async (req, res) => {
  let Id_pharmacy = { _id: ObjectId(req.params.id_pharmacy) }
  const result = await Product.find({ Product_Pharmacy: Id_pharmacy }).populate({ path: 'Product_Pharmacy', select: ['Pharmacy_name'] }).catch(err => err)
  res.send(result)
})
router.get('/DeleteProduct/:id_product', async (req, res) => {
  const result = await Product.findByIdAndRemove(req.params.id_product).catch(err => err)
  res.send(result)
})
router.post('/EditProduct/:id_product', upload.single('image'), async (req, res) => {
  if (req.file) {
    console.log('file is here', req.file.filename)
    req.body.image = req.file.filename;
  }
  const result = await Product.findByIdAndUpdate(req.params.id_product, { $set: req.body }).catch(err => err)
  res.send(result)
});

router.get('/allPharmacy', async (req, res) => {
  const result = await Pharmacy.find().populate({ path: 'id_user', select: ['user_image', 'adresse'] }).catch(err => err)
  res.send(result)
})

router.get('/allUsers' , async (req, res) => {
  const result = await User.find().populate([{path : 'id_doctor', select : ['specialty']}, { path : 'id_pharmacy', select : ['Pharmacy_name']}]).catch(err => err)
  res.send(result)
})
router.get('/allProducts', async (req, res) => {
  const result = await Product.find().populate([{ path: 'Product_Pharmacy', model: 'Pharmacy', populate: { path: 'id_user', model: 'User' } }]).catch(err => err)
  res.send(result)
})
router.get('/GerProductById/:id_product', async (req, res) => {
  let Id_product = { _id: ObjectId(req.params.id_product) }
  const result = await Product.find(Id_product).populate([{ path: 'Product_Pharmacy', model: 'Pharmacy', populate: { path: 'id_user', model: 'User' } }]).catch(err => err)
  res.send(result)
})

router.get('/GetMyCartById/:id_Cart', async (req, res) => {
  const result = await MyCart.findOne({ _id: ObjectId(req.params.id_Cart) }).populate({path : 'My_Products.productName', model: 'Product'}).catch(err => err)
  res.send(result)
})
router.get('/deleteProductFromCart/:id_product/:id_cart', async (req, res) => {
  let id_Cart = { _id: req.params.id_cart }
  const result = await MyCart.updateOne(id_Cart, { $pull: { My_Products:{ productName:ObjectId(req.params.id_product)} } })
  res.send(result)
})

router.post('/addProductToMyCart/:id_product/:id_cart', async (req, res) => {
  let Id_product = { _id: ObjectId(req.params.id_product) }
  obj = {
    productName: Id_product
  }
  const result = await MyCart.findByIdAndUpdate(req.params.id_cart, { $push: { My_Products: obj } }).catch(err => err)
  res.send(result)
})
router.post('/EditProductQuantityOfMyCart/:id_product/:id_cart/:index', async (req, res) => {
  let Id_product = { _id: ObjectId(req.params.id_product) }
  let index= req.params.index;
  obj = {
    productName: Id_product,
    Quantity : req.body.Quantity
  }
  const result = await MyCart.findByIdAndUpdate(req.params.id_cart, { $set: { [`My_Products.${index}`]: obj } }).catch(err => err)
  res.send(result)
})
module.exports = router
