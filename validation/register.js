const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateRegister(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: 2, max: 40})) {
        errors.name = "Name must be between 2 and 40 Characters";
    }
    if(!Validator.isLength(data.password, {min: 6, max: 40})) {
        errors.password = "Password must be between 6 and 40 Characters";
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = "Email invalid";
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = "email is required";
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "password confirmation is required";
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "password confirmation does not match";
    }
    

    return {errors, isValid: isEmpty(errors)}
}