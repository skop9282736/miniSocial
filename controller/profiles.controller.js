const Profile = require('../models/Profile')
const validateProfileInput = require('./../validation/profile')
const validateExperienceInput = require('./../validation/experience')
const validateEducationInput = require('./../validation/education')


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

module.exports.getProfileByHandle = async (req, res) => {
    const handle = req.params.handle
    const profile = await Profile.findOne({handle: handle})
                    .populate('user', ['name', 'avatar'])
    if(!profile) {
        return res.send(404).json({error: 'there is no profile for this user'})
    }
    return res.send(200).json({profile})
}

module.exports.getProfileById = async (req, res) => {
    const id = req.params.id
    const profile = await Profile.findById(id)
                    .populate('user', ['name', 'avatar'])
    if(!profile) {
        return res.send(404).json({error: 'there is no profile for this user'})
    }
    return res.send(200).json({profile})
}

module.exports.getAllProfiles = async (req, res) => {
    const profiles = await Profile.find()
                    .populate('user', ['name', 'avatar'])
    if(!profiles) {
        return res.send(404).json({error: 'there is no profile saved in the database'})
    }
    return res.send(200).json({profiles})
}

module.exports.AddExperienceToProfile = async (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }
    const profile = await Profile.findOne({user: req.user._id})
    const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
    }
    // add to experience array
    profile.experiences.unshift(newExp)
    await profile.save()
    return res.status(200).json(profile)
}


module.exports.AddEducationToProfile = async (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }
    const profile = await Profile.findOne({user: req.user._id})
    const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
    }
    // add to education array
    profile.education.unshift(newEdu)
    await profile.save()
    return res.status(200).json(profile)
}

module.exports.DeleteEducationToProfile = async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    const removeIndex = profile.education
        .map(education => education.id)
        .indexOf(req.params.edu_id)
    profile.education.splice(removeIndex, 1)
    await profile.save()

    return res.status(200).json(profile)
}

module.exports.DeleteExperienceFromProfile = async (req, res) => {
    const profile = await Profile.findOne({user: req.user._id})
    const removeIndex = profile.experiences
        .map(exp => exp.id)
        .indexOf(req.params.exp_id)
    profile.experiences.splice(removeIndex, 1)
    await profile.save()

    return res.status(200).json(profile)
}