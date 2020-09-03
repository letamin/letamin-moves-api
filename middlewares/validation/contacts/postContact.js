const validator = require('validator');
const { Contact } = require('../../../models/Contact');

const validateContact = async (req, res, status) => {
    let errors = [];

    const email = req.body.email || '';
    const subject = req.body.subject || '';
    const name = req.body.name || '';
    const message = req.body.message || '';

    //Validate email
    if (validator.isEmpty(email)) {
        errors.push("Email is required");
    } else if (!validator.isEmail(email)) {
        errors.push("Email is invalid.");
    }

    //validate name
    if (validator.isEmpty(name)) {
        errors.push("Name is required");
    }

    //validate subject
    if (validator.isEmpty(subject)) {
        errors.push("Subject is required");
    }

    //validate message
    if (validator.isEmpty(message)) {
        errors.push("Subject is required");
    }

    if (errors.length === 0) return next();
    return res.status(400).json(errors);
}

module.exports = {
    validateContact
}