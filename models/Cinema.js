const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    movieId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }]
})

const Cinema = mongoose.model('Cinema', CinemaSchema, 'Cinema');

module.exports = {
    Cinema, CinemaSchema
}