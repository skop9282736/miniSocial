const Profile = require('../models/Profile')
const validateProfileInput = require('./../validation/profile')


module.exports.getCurrentProfile = async (req, res) => { 
    const profile = await Profile.findOne({
        user: req.user.id
    })

    if(!profile) {
        return res.status(404).json('Profile not found')
    }

    res.status(200).json(profile)
}

module.exports.createCurrentProfile = async (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }

    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.skills) profileFields.skills = req.body.skills.split(',')
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername
    //social
    profileFields.social = {}
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook


    
    const profile = await Profile.findOne({
        user: req.user.id
    })

    if(!profile) { // create
        const profile = await Profile.create(profileFields)
        return res.status(200).json(profile)
    } else { // update
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true , useFindAndModify: false})
        return res.status(200).json(profile)
    }
}