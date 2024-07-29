const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../models/user')
const secret = process.env.JWT_SECRET
exports.userSignup = async (req, resp)=>{
    try {
    const {name, email, password} = req.body;

    const findUser= await users.findOne({email})
    if(findUser){
        resp.status(400).json({message: "User exist with this email, plsease try another email."})
    }
    const bcyptPassword = await bcrypt.hash(password, 10)
    const newUser = new users({name, email, password : bcyptPassword})
    await newUser.save();
    
    const userDetail = {
        _id : newUser._id,
        email,
        name
    }
    resp.status(200).json({msg : "User created successfully.", data: userDetail})
}
catch(error){
    console.log(error)
    resp.status(500).json({msg : "Server error"})
}
}

exports.userLogin = async (req, res)=>{
    try {
        const {email , password} = req.body;
        const findUser = await users.findOne({email})
        if(!findUser){
            res.status(400).json({msg : "Please enter correct email"})
        }
        const matchPassword = bcrypt.compare(password, findUser.password)
        if(!matchPassword){
            res.status(400).json({msg : "Please enter correct Password"})
        }
        const payload = {
            id : findUser._id,
            name : findUser.name, email, purchasedCourses : findUser.purchasedCourses}
        const token = jwt.sign(payload, secret, {expiresIn: '1h'})
        res.status(200).json({msg: "User loggded in successfully", data : payload, token})
    } catch (error) {
        return res.status(401).json({msg : "Server error"})
    }
}
