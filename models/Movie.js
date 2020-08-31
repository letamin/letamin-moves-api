const mongoose = require('mongoose');
const { MovieDateSchema } = require('./MovieDate');

const MovieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    trailer: { type: String, required: true },
    poster: { type: String, required: true },
    dates: [MovieDateSchema],
    price: { type: Number, default: 0 },
    promotion: { type: String, default: 'no-promotion' },
    status: { type: String, default: 'coming-soon' },
    genre: { type: String, default: 'General' },
    time: { type: Number },
    rated: { type: String, default: 'G' },
    language: { type: String, default: 'English-Vietsub' }
})

const Movie = mongoose.model('Movie', MovieSchema, 'Movie');

module.exports = {
    MovieSchema, Movie
}