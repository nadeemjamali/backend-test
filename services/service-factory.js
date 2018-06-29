const {
    repoFactory
} = require('../presistent/repo-factory');

const {
    Encryptor
} = require('../utils/encryptor');

const {
    UsersService
} = require('./users-service');


class ServiceFactory {
    constructor() {
        const encryptor = new Encryptor();
        this._usersService = new UsersService(encryptor, repoFactory.getUsersRepo());
    }

    /**
     * Get UsersService
     * @returns {UsersService}
     */
    getUserService() {
        return this._usersService;
    }

}

const serviceFactory = new ServiceFactory();
module.exports = {
    serviceFactory
};