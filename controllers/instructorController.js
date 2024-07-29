const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const instructors = require('../models/Instructor');
const course = require('../models/course');

exports.instructorSignup = async(req, resp)=>{
    try {
        const {firstName, lastName, email, password} = req.body;
        const findInstructor = await instructors.findOne({email})

        if(findInstructor){
            return resp.status(400).send({message : "Instructor already exist with this email, please try another email."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newInstructor = new instructors({firstName, lastName, email, password: hashedPassword });
        await newInstructor.save()

        const token = jwt.sign(newInstructor, process.env.JWT_SECRET, { expiresIn: '1h' });
        const insDetail = {
            _id : newInstructor._id,
            firstName,
            lastName, email
        }
        resp.status(201).json({ message: "Instructor created successfully", data: insDetail, token })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({message: "Server error"})
    }

}

exports.instructorLogin = async(req, resp)=>{
    try{
    const {email, password} = req.body;
     const instructor = await instructors.findOne({email})
     if(!instructor){
        resp.status(400).json({msg : "User not found please enter the valid email."})
     }
     console.log("Password provided:", password);
     console.log("Hashed password from DB:", instructor);
     const matchPassword = await bcrypt.compare(password, instructor.password)
     if(!matchPassword){
        resp.status(400).json({msg : "Please enter the valid password"})
     }
     const payload = {
        id : instructor._id,
        email,  firstName : instructor.firstName, 
        lastName : instructor.lastName
     }

     const token = jwt.sign(payload , process.env.JWT_SECRET, {expiresIn : "1h"})
     
     resp.status(200).json({msg : "Instructor sign in successfully", data : payload, token})
    }
     catch (error) {
        console.error(error);
        resp.status(500).json({ message: "Server error" });
    }
}

exports.createCourse = async(req, resp)=>{
    try {
        const {title, description, price, image, instructor} = req.body;

        const newcourse = new course({
            title, description, image, instructor , price
        })
        newcourse.save();
        resp.status(200).json({msg : "Course created succcessfully", data : newcourse})
        
    } catch (error) {
        resp.status(400).json({msg : "Server error"})
    }
}
