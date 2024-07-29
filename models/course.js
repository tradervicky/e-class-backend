const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title : {type : String, required : true},
    image : {type : String},
    description : {type : String , required : true},
    price : {type: Number, required: true},
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'instructors' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("courses", CourseSchema)