const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtVerify = promisify(jwt.verify);

module.exports.authenticate = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({
        message: "Token is required."
    })

    jwtVerify(token, "secretKey123!")
        .then(decoded => {
            req.user = decoded;
            next();
        })
        .catch(() => res.status(401).json({
            message: "Token invalid."
        }))
}

module.exports.authorize = (userTypeArray) => {
    return (req, res, next) => {
        const { user } = req;

        if (userTypeArray.indexOf(user.userType) === -1)
            return res.status(403).json({
                message: "You do not have permission to access."
            })

        next()
    }
}