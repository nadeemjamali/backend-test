const express = require('express');
const {
    checkSchema
} = require('express-validator/check');

const userService = require('../../services/service-factory').serviceFactory.getUserService();
const {
    registerSchema
} = require('../validators/user-validator');
const {
    validateData
} = require('../middlewares/validator');

const usersApi = express.Router();

usersApi.post('/register', checkSchema(registerSchema), validateData, async (req, resp, next) => {

    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const result = await userService.register(firstName, lastName, email, password);
        resp.json(200).json(result);

    } catch (err) {
        next(err);
    }

});

module.exports = {
    usersApi
};