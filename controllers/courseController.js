const course = require("../models/course");

exports.createCourse = async(req, resp)=>{
    try {
        const {title, image, description, price}= req.body
        const instructorId = req.instructors._id;
        const newCourse = new course({title, image, description, image,price, instructor: instructorId})
        await newCourse.save();

        resp.status(200).json({msg : "New course created successfully", data : newCourse})
    } catch (error) {
        console.log(error)
        resp.status(500).json({message: "Server error"})
    }
;



}