const { Ticket } = require("../../../../models/Ticket");
const { Movie } = require('../../../../models/Movie');
const { Seat } = require("../../../../models/Seat");
const { Cinema } = require('../../../../models/Cinema');

const { sendBookTicketEmail } = require('../../../../services/email/bookTicket/bookTicket');

const postTicket = (req, res, next) => {
    const { movieId, seatCodes, date, cinemaId } = req.body;
    const { _id: userId } = req.user;
    const errSeatCodes = [];

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return Promise.reject({
                    status: 404,
                    message: "Movie not found."
                })
            }

            if (seatCodes.length == 0) {
                return Promise.reject({
                    status: 404,
                    message: "Seat cannot be empty."
                })
            }

            if (!date) {
                return Promise.reject({
                    status: 404,
                    message: "Date cannot be empty."
                })
            }

            if (!cinemaId) {
                return Promise.reject({
                    status: 404,
                    message: "Cinema cannot be empty."
                })
            }

            const seatCodesFromMovie = movie.dates
                .filter(_date => _date.date.toString() == date)

            const availableSeatCodes = seatCodesFromMovie[0].seats.filter(seat => !seat.isBooked).map(seat => seat.code)

            seatCodes.forEach(code => {
                if (availableSeatCodes.indexOf(code) === -1) errSeatCodes.push(code);
            })

            if (!errSeatCodes.length == 0) {
                return Promise.reject({
                    status: 400,
                    message: `${errSeatCodes.join(", ")} is/are not available.`
                })
            }

            const newTicket = new Ticket({
                userId, movieId, date, cinemaId,
                seatCodes: seatCodes.map(code => new Seat({ code: code, isBooked: true })),
                totalPrice: seatCodes.length * movie.price
            })

            seatCodes.forEach(code => {
                const seatIndex = seatCodesFromMovie[0].seats.findIndex(seat => seat.code === code);
                seatCodesFromMovie[0].seats[seatIndex].isBooked = true;
            })

            return Promise.all([
                newTicket.save(),
                movie.save(),
                Cinema.findById(cinemaId)
            ])
        })
        .then(([ticket, movie, cinema]) => {
            sendBookTicketEmail(req.user, movie, ticket, cinema);
            res.status(200).json(ticket);
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

module.exports = {
    postTicket
}

