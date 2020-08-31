const mongoose = require('mongoose');
const { SeatSchema } = require('./Seat');

const MovieDateSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    seats: [SeatSchema],
})

const MovieDate = mongoose.model('MovieDate', MovieDateSchema, 'MovieDate');

module.exports = {
    MovieDateSchema, MovieDate
}