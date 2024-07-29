const bcrypt = require("bcrypt");
const users = require("../models/user");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const course = require("../models/course");
exports.userSignup = async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await users.findOne({ email });
    if (findUser) {
      resp
        .status(400)
        .json({
          message: "User exist with this email, plsease try another email.",
        });
    }
    const bcyptPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ name, email, password: bcyptPassword });
    await newUser.save();

    const userDetail = {
      _id: newUser._id,
      email,
      name,
    };
    resp
      .status(200)
      .json({ msg: "User created successfully.", data: userDetail });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ msg: "Server error" });
  }
};

//user signin function
exports.userSignIn = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({ email });
    if (!findUser) {
      resp
        .status(400)
        .json({ msg: "User doesn't exist please try another email" });
    }
    const matchPassword = await bcrypt.compare(password, findUser.password);
    
    if (!matchPassword) {
      resp.status(400).json({ msg: "Please enter valid password" });
    }
    const payload = {
      id: findUser._id,
      email,
      name: findUser.name,
      courses : findUser.purchasedCourses
    };
    
    const token = jwt.sign(payload, secret, {expiresIn : '1h'})
    resp.status(200).json({msg : "User logged in sucessfully", data: payload, token})
  } catch (error) {
    resp.status(401).json({msg : "server error"})
  }
};

exports.purchaseCourse = async(req, resp)=>{
    try {
        const {courseId} = req.body;
        const Course = await course.findOne({courseId})
        if(!Course){
            resp.status(400).json({msg : "Course not found with this course id."})
        }
        const user = await req.user;
        const userCourse = await user.findOne({})
        const findDuplicate = userCourse.purchaseCourse.includes(courseId)
        if(findDuplicate){
            resp.status(401).json({msg : "Already purchased this course"})
        }
        userCourse.purchaseCourse.push(courseId)
        await user.save()
        resp.status(200).json({msg : "course purchased successfully", data : user.purchaseCourse})
    } catch (error) {
        resp.status(400).json({msg : "Internal server error!"})
        
    }
}
