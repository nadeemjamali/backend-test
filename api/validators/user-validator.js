const getLength = (name, min, max) => ({
    errorMessage: `${name} should be minimum ${min} and maximum ${max} characters long!`,
    options: {
        min,
        max
    }
});

const firstName = {
    in: ['body'],
    errorMessage: 'Invalid first name address!',
    isLength: getLength('first name', 4, 500),
    trim: true
};

const lastName = {
    in: ['body'],
    errorMessage: 'Invalid last name address!',
    isLength: getLength('last name', 4, 500),
    trim: true
};


const email = { in: ['body'],
    errorMessage: 'Invalid email address!',
    isEmail: {
        options: {
            'allow_display_name': false,
            'allow_utf8_local_part': false,
            'require_tld': false
        }
    },
    isLength: getLength('email', 5, 500),
    normalizeEmail: true,
    trim: true
};

const getPasswordSchema = (pass, isConfirm) => ({ in: ['body'],
    errorMessage: `Invalid ${pass}! Should be at least 8 and at most 250 characters long and
    allowed characters: a-z, A-Z, 0-9 and !@#$*^-_?+=`,
    isLength: getLength(pass, 8, 250),
    trim: true,
    custom: {
        options: (value, {
            req
        }) => {
            const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$*^-_?+=])[A-Za-z\d!@#$*^-_?+=]{8,250}/);
            if (!pattern.test(value)) {
                return false;
            }
            if (isConfirm && value != req.body.newPassword) {
                return false;
            }
            return true;
        }
    }
})

const registerSchema = {
    firstName,
    lastName,
    email,
    password: getPasswordSchema('password', false)
}

module.exports = {
    registerSchema
};

