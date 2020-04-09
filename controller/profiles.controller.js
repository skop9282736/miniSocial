const Profile = require('../models/Profile')


module.exports.getCurrentProfile = async (req, res) => { 
    const profile = await Profile.findOne({
        user: req.user.id
    })

    if(!profile) {
        return res.status(404).json('Profile not found')
    }

    res.status(200).json(profile)
}