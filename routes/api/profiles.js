const express = require('express')
const passport = require('passport')
const wrap = require('express-exception-handler').wrap
const ProfileController = require('../../controller/profiles.controller')

const router = express.Router()

/*
    @route POST api/profile
    @desc get current user profile
    @access private
*/
router.get('', 
            passport.authenticate('jwt', {session: false}), 
            wrap(ProfileController.getCurrentProfile))

module.exports  = router