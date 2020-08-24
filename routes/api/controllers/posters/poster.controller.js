const { Poster } = require('../../../../models/Poster');

const getPosters = (req, res, next) => {
    Poster.find()
        .then(posters => {
            return res.status(200).json(posters)
        })
        .catch(err => res.json(err))
}

const getPosterById = (req, res, next) => {
    const { id } = req.params;

    Poster.findById(id)
        .then(poster => {
            if (!poster) {
                return Promise.reject({
                    status: 404,
                    message: "Poster not found."
                })
            }

            res.status(200).json(poster)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

const postPoster = (req, res, next) => {
    const { url } = req.body;

    const newPoster = new Poster({ url });
    newPoster.save()
        .then(poster => {
            res.status(201).json(poster)
        })
        .catch(err => res.json(err))
}

const patchPosterById = (req, res, next) => {
    const { id } = req.params;

    Poster.findById(id)
        .then(poster => {
            if (!poster) {
                return Promise.reject({
                    status: 404,
                    message: "Poster not found."
                })
            }

            Object.keys(req.body).forEach(key => {
                poster[key] = req.body[key];
            })
            return poster.save();
        })
        .then(poster => res.status(200).json(poster))
        .catch(err => res.json(err))
}

const deletePosterById = (req, res, next) => {
    const { id } = req.params;

    Poster.findById(id)
        .then(poster => {
            if (!poster) {
                return Promise.reject({
                    status: 404,
                    message: "Poster not found."
                })
            }

            return Poster.deleteOne({ _id: id })
        })
        .then(() => res.status(204).json())
        .catch(err => res.json(err))
}

module.exports = {
    getPosters,
    getPosterById,
    postPoster,
    patchPosterById,
    deletePosterById
}