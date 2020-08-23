const { MovieDate } = require('../../../../models/MovieDate');

const getMovies = (req, res, next) => {
    const { time } = req.params;

    var query = { date: `${time}` };

    MovieDate.find(query)
        .then(movies => {
            res.status(200).json(movies)
        })
        .catch(err => res.json(err))
}

module.exports = {
    getMovies
}