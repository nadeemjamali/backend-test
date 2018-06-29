const {
    UsersRepository
} = require('./users-repository');

class RepoFactory {
    constructor() {
        this._usersRepo = new UsersRepository();
    }

    /**
     * Get UsersRepository
     * @returns {UsersRepository}
     */
    getUsersRepo() {
        return this._usersRepo;
    }
}

//create a SingleTon object
const repoFactory = new RepoFactory();

module.exports = {
    repoFactory
};