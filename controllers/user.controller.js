const UserModel = require('../models/User.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })


exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(401).json({ success: false, message: {error: 'First name , last name, email and password are required'} })
    }

    try {
        const findIfUserExist = await UserModel.findOne({ email })
        console.log('findIfUserExist', findIfUserExist);
        if (findIfUserExist) {
            res.status(409).json({ success: false, message: {email: "User with this email already exist"} })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const createUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        await createUser.save()

        return res.json({
            success: true,
            message: 'User has been signed up successfully',
            user: {
                _id: createUser._id,
                email: createUser.email,
                createdAt: createUser.createdAt,
                updatedAt: createUser.updatedAt,
                __v: createUser.__v

            }
        })
    } catch (error) {
        res.status(500).send(
            {
                message: {error: 'Internal server error'},
                success: false,
                error: error.message
            }
        )
    }
}

exports.logIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ success: false, message: {error: 'Email and password are required'} })
    }
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(409).send({ success: false, message: {email: 'Email doesn\'t exist'} })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ success: false, message: {password:'Incorrect password'} })
        }

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2y" })

        return res.json({
            success: true,
            message: 'User has been logged in successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        })
    } catch (error) {
        res.status(500).send(
            {
                message: {error: 'Internal server error'},
                success: false,
                error: error.message
            }
        )
    }

}
