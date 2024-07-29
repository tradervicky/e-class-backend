const mongoose = require('mongoose')
const course = require('../models/course')
const UserSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true, unique: true},
    password: {type: String, required : true, minLength : 6},
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    
})

module.exports = mongoose.model("users", UserSchema)