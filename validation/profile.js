const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateProfile(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills  = !isEmpty(data.skills ) ? data.skills  : '';

    if(Validator.isEmpty(data.handle)) {
        errors.handle = "handle is required";
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = "status is required";
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = "skills is required";
    }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = "Not a valid URL"
        }
    }

    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = "Not a valid URL"
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = "Not a valid URL"
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = "Not a valid URL"
        }
    }


    return {errors, isValid: isEmpty(errors)}
}