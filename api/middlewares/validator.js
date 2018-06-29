const {
    validationResult
} = require('express-validator/check');

const {
    HttpError
} = require('../../models/errors');

const validateData = (req, resp, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        const errs = errors.mapped();
        const errMsg = Object.keys(errs).map(key => errs[key].msg).join(', ');
        throw new HttpError(422, errMsg);
    }

};

module.exports = {
    validateData
};