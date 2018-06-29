const express = require('express');

const userService = require('../../services/service-factory').serviceFactory.getUserService();

const usersApi = express.Router();

usersApi.post('/register', async (req, resp, next) => {

    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const result = await userService.register(firstName, lastName, email, password);
        return resp.json(200).json(result);

    } catch (err) {
        next(err);
    }

});

module.exports = {
    usersApi
};