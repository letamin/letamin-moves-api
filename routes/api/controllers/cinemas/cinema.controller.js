const { Cinema } = require('../../../../models/Cinema');
const Movie = require('../../../../models/Movie');

const getCinemas = (req, res, next) => {
    Cinema.find()
        .then(cinemas => {
            res.status(200).json(cinemas)
        })
        .catch(err => res.json(err))
}

const getCinemaById = (req, res, next) => {
    const { id } = req.params;
    Cinema.findById(id)
        .then(cinema => {
            if (!cinema) {
                return Promise.reject({
                    status: 404,
                    message: 'Cinema not found.'
                })
            }

            res.status(200).json(cinema)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

const getCinemaByProvince = (req, res, next) => {
    const { province } = req.params;

    var query = { searchTerm: `${province}` };

    Cinema.find(query)
        .then(cinema => {
            res.status(200).json(cinema)
        })
        .catch(err => res.status(404).json(err))
}

const getCinemaByMovie = (req, res, next) => {
    const { id } = req.params;

    var query = { movieId: `${id}` };

    Cinema.find(query)
        .then(cinema => {
            res.status(200).json(cinema);
        })
        .catch(err => res.status(404).json(err))
}

const postCinema = (req, res, next) => {
    const { name, address, movieId, province, searchTerm } = req.body;

    const newCinema = new Cinema({ name, address, movieId, province, searchTerm });
    newCinema.save()
        .then(cinema => {
            res.status(200).json(cinema)
        })
        .catch(err => res.json(err))
}

const patchCinema = (req, res, next) => {
    const { id } = req.params;

    Cinema.findById(id)
        .then(cinema => {
            if (!cinema) {
                return Promise.reject({
                    status: 400,
                    message: 'Cinema not found.'
                })
            }

            Object.keys(req.body).forEach(key => {
                cinema[key] = req.body[key];
            })
            return cinema.save();
        })
        .then(cinema => res.status(200).json(cinema))
        .catch(err => res.json(err))
}

const deleteCinemaById = (req, res, next) => {
    const { id } = req.params;

    Cinema.findById(id)
        .then(cinema => {
            if (!cinema) {
                return Promise.reject({
                    status: 404,
                    message: 'Cinema not found.'
                })
            }

            return Cinema.deleteOne({ _id: id })
        })
        .then(() => res.status(204).json())
        .catch(err => res.json(err))
}

module.exports = {
    getCinemas,
    getCinemaById,
    getCinemaByProvince,
    getCinemaByMovie,
    postCinema,
    patchCinema,
    deleteCinemaById,
}