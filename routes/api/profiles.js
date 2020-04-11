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


/*
    @route GET api/profile/handle/:handle
    @desc get  profile by handle
    @access public
*/
router.get('/handle/:handle',wrap(ProfileController.getProfileByHandle))

/*
    @route GET api/profile/:id
    @desc get  profile by id
    @access public
*/
router.get('/:id',wrap(ProfileController.getProfileByHandle))

/*
    @route GET api/profile
    @desc get  all profiles
    @access public
*/
router.get('/all',wrap(ProfileController.getAllProfiles))

module.exports = router