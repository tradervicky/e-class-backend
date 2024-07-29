const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    lastName  : {type:String, required:true},
    email : {type: String, required : true, unique: true},
    password: {type: String, required : true, minLength : 6},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('instructors', InstructorSchema)