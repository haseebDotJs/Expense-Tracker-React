const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model')


module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        res.status(400).json({ success: false, message: "Please provide token" })
    }
    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET)
        console.log('decoded',decoded);
        if(!decoded){
            return res.status(400).json({success: false,message: "Invalid token"})
        }
        const user = await UserModel.findById({ _id: decoded.id })
        if (!user) {
            res.status(404).json({ success: false, message: "User doesn\'t exist" })
        }
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}