const bcrypt = require('bcrypt')
const users = require('../models/user')
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
