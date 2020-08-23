const mongoose = require('mongoose');
const { SeatSchema } = require('./Seat');

const TicketSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    },
    seatCodes: [SeatSchema],
    totalPrice: Number,
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema"
    }
})

const Ticket = mongoose.model("Ticket", TicketSchema, "Ticket");

module.exports = {
    TicketSchema, Ticket
}