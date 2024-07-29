const express = require('express')
const router =  express.Router()
const {instructorSignup, createCourse, instructorLogin } = require('../controllers/instructorController')
const instructorSignMiddleware = require('../middleware/authInstructor')
// console.log( "check",instructorController)

router.post('/signup', instructorSignup )
router.post('/signin', instructorLogin )

// create course 

router.post('/create', instructorSignMiddleware, createCourse)

module.exports = router