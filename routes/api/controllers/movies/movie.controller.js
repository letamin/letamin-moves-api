const { Movie } = require('../../../../models/Movie');
const { Seat } = require('../../../../models/Seat');
const { MovieDate } = require('../../../../models/MovieDate');

const seatCodeArray = [
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12",
    "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12",
    "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12",
    "D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12",
    "E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10", "E11", "E12",
    "F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "F11", "F12",
    "G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12",
    "H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12",
    "I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12",
    "J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09", "J10", "J11", "J12",
    "K01", "K02", "K03", "K04", "K05", "K06", "K07", "K08", "K09", "K10", "K11", "K12",
]

const getMovies = (req, res, next) => {
    Movie.find()
        .then(movies => {
            const _movies = movies.map(movie => {
                const modifiedMovie = {
                    ...movie._doc,
                    availableSeatNumber: movie.dates.map(date => {
                        const modifiedDate = {
                            ...date._doc,
                            seatsNumber: date.seats.filter(seat => !seat.isBooked).length
                        }
                        delete modifiedDate.seats
                        return modifiedDate
                    })
                }
                delete modifiedMovie.dates
                return modifiedMovie;
            })

            res.status(200).json(_movies)
        })
        .catch(err => res.json(err))
}

const getMovieById = (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .then(movie => {
            if (!movie) {
                return Promise.reject({
                    status: 404,
                    message: "Movie not found."
                })
            }

            res.status(200).json(movie)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

const getMovieByDate = (req, res, next) => {
    const { date } = req.params;

    Movie.find({ "dates.date": `${date}` })
        .then(movie => {
            res.status(200).json(movie)
        })
        .catch(err => res.json(err))
}

const getMoviesByStatus = (req, res, next) => {
    const { status } = req.params;
    var query = { status: `${status}` };

    Movie.find(query)
        .then(movies => {
            res.status(200).json(movies)
        })
        .catch(err => res.json(err))

}

const postMovie = (req, res, next) => {
    const { name, description, price, trailer, poster, dates, time, status, rated } = req.body;

    const seats = seatCodeArray.map(code => {
        return new Seat({ code });
    })

    const movieDate = dates.map(date => {
        return new MovieDate({ date, seats })
    })

    const newMovie = new Movie({ name, description, price, trailer, poster, dates: movieDate, time, status, rated });

    newMovie.save()
        .then(movie => {

            dates.map(date => {
                const newDate = new MovieDate({
                    movieId: movie._id,
                    date: Date.parse(date.slice(0, 15)).toString(),
                    time: date,
                });
                newDate.save()
            })

            res.status(201).json(movie)
        })
        .catch(err => res.json(err))
}

const patchMovieById = (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .then(movie => {
            if (!movie) {
                return Promise.reject({
                    status: 404,
                    message: "Movie not found."
                })
            }

            Object.keys(req.body).forEach(key => {
                movie[key] = req.body[key];
            })
            return movie.save();
        })
        .then(movie => res.status(200).json(movie))
        .catch(err => res.json(err))

}

const deleteMovieById = (req, res, next) => {
    const { id } = req.params;

    var query = { _id: id }

    MovieDate.find(query).then(
        Movie.findById(id)
            .then(movie => {
                if (!movie) {
                    return Promise.reject({
                        status: 404,
                        message: "Movie not found."
                    })
                }

                return Movie.deleteOne({ _id: id })
            })
            .then(() => res.status(204).json())
            .catch(err => res.json(err))
    )

}

module.exports = {
    getMovies,
    getMovieById,
    getMoviesByStatus,
    getMovieByDate,
    postMovie,
    patchMovieById,
    deleteMovieById
}