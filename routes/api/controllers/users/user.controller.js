const { User } = require('../../../../models/User');
const { promisify } = require("util"); // built-in package
const { sendCreateUserEmail } = require('../../../../services/email/createUser/createUser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSign = promisify(jwt.sign);

const postUser = (req, res, next) => {
    const { email, password, fullName } = req.body;
    const newUser = new User({ email, password, fullName });

    newUser.save()
        .then(user => {
            sendCreateUserEmail(user, password);
            res.status(201).json(user);
        })
        .catch(err => res.json(err))
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    let _user;

    User.findOne({ email })
        .then(user => {
            _user = user;
            if (!user) return Promise.reject({
                status: 404,
                message: "Email not found."
            })

            return bcrypt.compare(password, user.password);
        })
        .then(isMatched => {
            if (!isMatched) return Promise.reject({
                status: 400,
                message: "Wrong password."
            });

            const payload = {
                _id: _user._id,
                email: _user.email,
                fullName: _user.fullName,
                userType: _user.userType
            };
            return jwtSign(payload, "secretKey123!", { expiresIn: "1h" });
        })
        .then(token => {
            return res.status(200).json({
                message: "Login successfully",
                token
            })
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

module.exports = {
    postUser,
    login
}