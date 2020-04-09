const User = require('../models/User')
const validateRegisterInput = require('./../validation/register')
const validateLoginInput = require('./../validation/login')

module.exports.registerUser = async (req, res, next) => {
    const {errors, isValid} = validateRegisterInput(req.body)
    
    if(!isValid) {
        return res.status(400).json(errors)
    }

    const user = await User.findOne({email: req.body.email})
    if(user) {
        return res.status(400).json({
            email: 'email already exists'
        })
    } else {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            user
        })
    }
}

module.exports.loginUser = async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body)
    
    if(!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({
            email: "User with this email not found"
        })
    }
    const checkPassword = await user.matchPassword(password)
    if(!checkPassword) {
        return res.status(404).json({
            password: "Password or Email Incorrect"
        })
    }
    const jwt = user.getSignedJwtToken()
    return res.status(200).json({jwt})
}

module.exports.currentUser = async (req, res) => {
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    })
}