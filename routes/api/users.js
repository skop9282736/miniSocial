const express = require('express')
const wrap = require('express-exception-handler').wrap
const User = require('./../../models/User')

const router = express.Router()

/*
    @route GET api/users
    @access public
*/
router.get('', (req, res) => {
    res.send('users route')
})

/*
    @route POST api/users/register
    @access public
*/
router.post('/register', wrap(
    async (req, res, next) => {
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
))

module.exports  = router