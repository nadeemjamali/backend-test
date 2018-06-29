const {
    Encryptor
} = require('../utils/encryptor');

const {
    UsersRepository
} = require('../presistent/users-repository');

class UsersService {
    /**
     * 
     * @param {Encryptor} encryptor 
     * @param {UsersRepository} userRepo
     */
    constructor(encryptor, userRepo) {
        this._encryptor = encryptor;
        this._userRepo = userRepo;
    }
    /**
     * 
     * @param {string} firstName the first name of the user
     * @param {string} lastName the last name of the suer
     * @param {string} email the email of the user
     * @param {string} password the password of the user
     * @returns {number} the id of the user
     */
    async register(firstName, lastName, email, password) {
        const passHash = await this._encryptor.hashIt(password);
        const user = {
            firstName,
            lastName,
            email,
            passHash
        };

        const result = await this._userRepo.addNewUser(user);
        return result;
    }
}

module.exports = {
    UsersService
}