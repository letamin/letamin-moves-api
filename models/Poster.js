const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema({
    url: { type: String, required: true }
})

const Poster = mongoose.model('Poster', PosterSchema, 'Poster');

module.exports = {
    PosterSchema, Poster
}