const express = require('express')
const passport = require('passport')
const wrap = require('express-exception-handler').wrap
const ProfileController = require('../../controller/profiles.controller')

const router = express.Router()

/*
    @route GET api/profile
    @desc get current user profile
    @access private
*/
router.get('',
    passport.authenticate('jwt', { session: false }),
    wrap(ProfileController.getCurrentProfile))


/*
    @route POST api/profile
    @desc create/edit current user profile
    @access private
*/
router.post('',
    passport.authenticate('jwt', { session: false }),
    wrap(ProfileController.createCurrentProfile))

module.exports = router