const nodemailer = require('nodemailer');
const fs = require('fs'); //built-in
const hogan = require('hogan.js');

const template = fs.readFileSync('services/email/createUser/createUserEmailTemplate.hjs', 'utf-8');
const compileTemplate = hogan.compile(template);

module.exports.sendCreateUserEmail = (user, password) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: "minh.cybersoft@gmail.com",
            pass: "thanhMinh0109."
        }
    }

    const transporter = nodemailer.createTransport(transport);

    const mailOptions = {
        from: "minh.cybersoft@gmail.com",
        to: user.email,
        subject: "Your account for Letamin Movies has been created.",
        html: compileTemplate.render({
            email: user.email,
            password: password,
            name: user.fullName
        })
    }

    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err);
        console.log("Email sent successfully")
    })
}