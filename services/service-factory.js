const {
    UsersService
} = require('./users-service');

class ServiceFactory {
    constructor() {
        this._usersService = new UsersService();
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