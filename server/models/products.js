let mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    Name: {
        type: String
    },

    Price: {
        type: String
    },

    Stock: {
        type: String
    },

    Date_Of_Entry: {
        type: String,

    },

    Date_Of_Expiration: {
        type: String,

    },

    Product_Category: {
        type: String,
        enum: ['Drug', 'Bio Product', 'Aesthetic Product', 'Accessory']

    },

    Product_Pharmacy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' }],

});

module.exports = mongoose.model('Product', ProductSchema);