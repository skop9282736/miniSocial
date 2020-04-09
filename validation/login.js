const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateLogin(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.password, {min: 6, max: 40})) {
        errors.password = "Password or Email Incorrect";
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

    return {errors, isValid: isEmpty(errors)}
}