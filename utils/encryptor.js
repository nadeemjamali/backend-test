const bcrypt = require('bcryptjs');

class Encryptor {
    constructor() {
        this._algorithm = 'aes-256-ctr';
    }

    async hashIt(content) {
        return new Promise((resolve, reject) => {

            bcrypt.genSalt(12, (err, salt) => {

                if (err) {
                    reject(err);
                }

                bcrypt.hash(content, salt, (herr, hres) => {
                    if (herr)
                        reject(herr);

                    resolve(hres);
                });
            });
        });
    }

    async verifyHash(password, passwordHash) {

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, passwordHash, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
}

module.exports = {
    Encryptor
}
