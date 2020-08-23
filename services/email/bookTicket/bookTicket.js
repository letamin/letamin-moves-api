const nodemailer = require('nodemailer');
const fs = require('fs'); //built-in
const hogan = require('hogan.js');

const template = fs.readFileSync('services/email/bookTicket/bookingTicketEmailTemplate.hjs', 'utf-8');
const compiledTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (user, movie, ticket, cinema) => {
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
        subject: "Your ticket(s) is confirmed.",
        html: compiledTemplate.render({
            email: user.email,
            movie: movie.name,
            price: movie.price,
            cinema: cinema.name,
            date: ticket.date.toLocaleString(),
            amount: ticket.seatCodes.length,
            total: movie.price * ticket.seatCodes.length,
            seatCodes: ticket.seatCodes
                .map(code => code.code)
                .join(", ")
        })
    }

    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err);
        console.log("Email sent successfully")
    })
}