const express = require('express')
const wrap = require('express-exception-handler').wrap
const userController = require('../../controller/users.controller')
const router = express.Router()
const passport = require('passport')

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
    userController.registerUser
))

/*
    @route POST api/users/login
    @desc returning JWT token
    @access public
*/
router.post('/login', wrap(
    userController.loginUser
))

/*
    @route GET api/users/current
    @desc returning logged in user
    @access private
*/
router.get('/current',
 passport.authenticate('jwt', {session: false}),
 userController.currentUser)

module.exports  = router