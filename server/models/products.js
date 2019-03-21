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
        type: Date,
        default: Date.now,
        validate: [(v) => v instanceof Date, 'course date shall be a date.']
    },

    Date_Of_Expiration: {
        type: Date,
        default: Date.now,
        validate: [(v) => v instanceof Date, 'course date shall be a date.']
    },

    
    Product_image: String,

    user_followed_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: [true, 'user\'s course is mandatory'] }],

    user_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    user_comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    user_project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});