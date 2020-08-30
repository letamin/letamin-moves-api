const mongoose = require("mongoose");
const { MovieDateSchema } = require('./MovieDate');

const SeatSchema = new mongoose.Schema({
    code: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    date: [MovieDateSchema],
})

const Seat = mongoose.model("Seat", SeatSchema, "Seat");

module.exports = {
    SeatSchema, Seat
}