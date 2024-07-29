const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const Users = require('../models/user')
const userSigninMiddleware = async (req, resp, next )=>{
    const token = req.header('token')
    if(!token){
        return resp.status(401).json({msg : "token is not provided"})
    }
    try {
        const decoded = jwt.verify(token, secret)
        const userDetail = await Users.findOne(decoded.id)
        if(!userDetail){
            return resp.status(401).json({msg : "Unauthorized entry"})
        }
        next()
    } catch (error) {
        resp.status(401).json({msg : "Token is not valid"})
        
    }
}

module.exports = userSigninMiddleware;