const express = require('express')
const router = express.Router()

const {userSignup, userSignIn, purchaseCourse} = require('../controllers/userController')
const userSigninMiddleware = require('../middleware/authUserMiddleware')


router.post('/signup', userSignup)
router.post('/signin', userSignIn)
router.post('/purchase', userSigninMiddleware, purchaseCourse)

const {userSignup, userLogin} = require('../controllers/userController')


module.exports = router;
