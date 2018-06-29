class UsersService {

    /**
     * 
     * @param {string} firstName the first name of the user
     * @param {string} lastName the last name of the suer
     * @param {string} email the email of the user
     * @param {string} password the password of the user
     */
    async register(firstName, lastName, email, password) {
        console.log(`${firstName} ${lastName} ${email} ${password}`)
    }
}

module.exports = {
    UsersService
}