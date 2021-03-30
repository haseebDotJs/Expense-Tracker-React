const express = require('express')

const router = express.Router()

const { signUp, logIn } = require('../controllers/user.controller')

router
    .route('/login')
    .post(logIn)    
router
    .route('/signup')
    .post(signUp)

module.exports = router