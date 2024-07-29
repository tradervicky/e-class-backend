const jwt = require('jsonwebtoken')
const Instructor = require("../models/Instructor");
const secret = process.env.JWT_SECRET
const instructorSignMiddleware = async (req, resp, next)=>{
    const token = req.header("token");
    // console.log("token", token)
   if(!token){
    return resp.status(401).json({msg : "token is not provided"})
   }
   try {
    const decoded = jwt.verify(token, secret);
    // console.log(decoded)
    const instructorDetail = await Instructor.findById(decoded.id);
    
    if (!instructorDetail) {
        return resp.status(401).json({ msg: "Unauthorized entry" });
    }
    next();
} catch (error) {
    resp.status(401).json({ msg: "Token is not valid" });
}
}

module.exports = instructorSignMiddleware;