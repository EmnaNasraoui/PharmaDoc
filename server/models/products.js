let mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    Name: {
        type: String
    },

    Price: {
        type: Number
    },

    Date_Of_Entry: {
        type: String,

    },

    Date_Of_Expiration: {
        type: String
    },

    Product_image: {
        type: String
    },
    Description: {
        type: String
    },
    Amount: {
        type: Number,
        min: 0
    },
    Product_Category: {
        type: String,
        enum: ['Drug', 'sirop', 'injectables', 'Poudre', 'dermiques', 'Bio Product', 'Aesthetic Product', 'Accessory']

    },

    Product_Pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },

});

module.exports = mongoose.model('Product', ProductSchema);