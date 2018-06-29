const fs = require('fs');
const {join} = require('path');

class UsersRepository {

    constructor(){
        this._dataFilePath = './users.json';
    }

    /**
     * 
     * @param {{
            firstName:string,
            lastName:string,
            email:string,
            passHash:string
        }} user the user object/model
        @returns {number} the id of the user
     */
    async addNewUser(user) {
        const allUsers = await this._getAllUserAsync();
        
        //setting up numeric id here, in production a unique string like UUIDv4 can be used
        user['id'] = allUsers.length + 1; 
        allUsers.push(user);
        this._saveAllUsers(allUsers);

        return user['id'];
    }

    async _getAllUserAsync(){
        const data = await this._getUsersDataAsync();
        return JSON.parse(data);
    }
    /**
     * @returns {any[]}
     */
    async _getUsersDataAsync(){
        return new Promise((resolve, reject) => {
            fs.readFile(join(__dirname, this._dataFilePath), (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
     }
     
    async _saveAllUsers(usersArray){
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(usersArray);
            fs.writeFile(join(__dirname, this._dataFilePath), data, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
     }
     
}

module.exports = {
    UsersRepository
};