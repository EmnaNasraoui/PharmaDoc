let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var MyCartSchema = new Schema({
  My_Products: [{
    productName: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    Quantity: {
      type: Number,
      default: 1
    }
  }]
})

module.exports = mongoose.model('MyCart', MyCartSchema);
