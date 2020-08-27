const validator = require('validator');
const { User } = require('../../../models/User');

//Validate users creation
const validatePostUser = async (req, res, next) => {
    let errors = {};

    const email = req.body.email || '';
    const password = req.body.password || '';
    const fullName = req.body.fullName || '';

    //Validate email
    if (validator.isEmpty(email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid.";
    } else {
        const user = await User.findOne({ email });
        if (user) {
            errors.email = "Email is already existed."
        }
    }

    //Validate password
    if (validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else if (!validator.isLength(password, { min: 6 })) {
        errors.password = "Password must be at least 6 characters.";
    }

    //validate full name
    if (validator.isEmpty(fullName)) {
        errors.fullName = "Fullname is required";
    }

    if (Object.keys(errors).length === 0 && errors.constructor === Object) return next();
    return res.status(400).json({ message: errors });
}

module.exports = {
    validatePostUser
}