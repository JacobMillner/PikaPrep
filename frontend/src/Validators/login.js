import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateInput(data) {
    let errors = {};

    if (Validator.isNull(data.email))
    {
        errors.email = 'This field is required';
    }

    if (!Validator.isEmail(data.email))
    {
        errors.email = 'Invalid Email';
    }

    if (Validator.isNul(data.password)) {
        errors.password = 'This field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}