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
router.get('/handle/:handle', wrap(ProfileController.getProfileByHandle))

/*
    @route GET api/profile/:id
    @desc get  profile by id
    @access public
*/
router.get('/:id', wrap(ProfileController.getProfileByHandle))

/*
    @route GET api/profile
    @desc get  all profiles
    @access public
*/
router.get('/all', wrap(ProfileController.getAllProfiles))

/*
    @route POST api/profile/experience
    @desc add experience to profile
    @access private
*/
router.post('/experience', 
                        passport.authenticate('jwt', { session: false }),
                        wrap(ProfileController.AddExperienceToProfile))


/*
    @route POST api/profile/education
    @desc add education to profile
    @access private
*/
router.post('/education', 
                        passport.authenticate('jwt', { session: false }),
                        wrap(ProfileController.AddEducationToProfile))


/*
    @route DELETE api/profile/education
    @desc delete education to profile
    @access private
*/
router.delete('/education/:edu_id', 
                        passport.authenticate('jwt', { session: false }),
                        wrap(ProfileController.DeleteEducationToProfile))


/*
    @route DELETE api/profile/education 
    @desc delete education to profile
    @access private
*/
router.delete('/experience/:exp_id', 
                        passport.authenticate('jwt', { session: false }),
                        wrap(ProfileController.DeleteExperienceFromProfile))

module.exports = router