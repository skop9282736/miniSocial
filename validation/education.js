const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateEducation(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';

    if(Validator.isEmpty(data.school)) {
        errors.school = "school is required";
    }

    if(Validator.isEmpty(data.degree)) {
        errors.degree = "degree is required";
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = "from date is required";
    }
    
    if(Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = "fieldOfStudy date is required";
    }


    return {errors, isValid: isEmpty(errors)}
}