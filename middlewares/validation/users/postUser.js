const validator = require('validator');
const { User } = require('../../../models/User');

//Validate users creation
const validatePostUser = async (req, res, next) => {
    let errors = [];

    const email = req.body.email || '';
    const password = req.body.password || '';
    const fullName = req.body.fullName || '';

    //Validate email
    if (validator.isEmpty(email)) {
        errors.push("Email is required");
    } else if (!validator.isEmail(email)) {
        errors.push("Email is invalid.");
    } else {
        const user = await User.findOne({ email });
        if (user) {
            errors.push("Email is already existed.");
        }
    }

    //Validate password
    if (validator.isEmpty(password)) {
        errors.push("Password is required");
    } else if (!validator.isLength(password, { min: 6 })) {
        errors.push("Password must be at least 6 characters.");
    }

    //validate full name
    if (validator.isEmpty(fullName)) {
        errors.push("Name is required");
    }

    if (errors.length != 0) return next();
    return res.status(400).json(errors);
}

module.exports = {
    validatePostUser
}