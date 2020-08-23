const { Promotion } = require('../../../../models/Promotion');

const getPromotions = (req, res, next) => {
    Promotion.find()
        .then(promotions => {
            res.status(200).json(promotions)
        })
        .catch(err => res.json(err))
}

const getPromotionById = (req, res, next) => {
    const { id } = req.params;

    Promotion.findById(id)
        .then(promotion => {
            if (!promotion) {
                return Promise.reject({
                    status: 404,
                    message: "Promotion not found."
                })
            }

            res.status(200).json(promotion)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message });
            return res.json(err);
        })
}

const postPromotion = (req, res, next) => {
    const { name, startTime, endTime, description, image } = req.body;

    const newPromotion = new Promotion({ name, startTime, endTime, description, image });
    newPromotion.save()
        .then(promotion => {
            res.status(201).json(promotion)
        })
        .catch(err => res.json(err))
}

const patchPromotionById = (req, res, next) => {
    const { id } = req.params;

    Promotion.findById(id)
        .then(promotion => {
            if (!promotion) {
                return Promise.reject({
                    status: 404,
                    message: "Promotion not found."
                })
            }

            Object.keys(req.body).forEach(key => {
                promotion[key] = req.body[key];
            })

            return promotion.save()
        })
        .then(promotion => res.status(200).json(promotion))
        .catch(err => res.json(err))
}

const deletePromotionById = (req, res, next) => {
    const { id } = req.params;

    Promotion.findById(id)
        .then(promotion => {
            if (!promotion) {
                return Promise.reject({
                    status: 404,
                    message: "No promotion found."
                })
            }

            return Promotion.deleteOne({ _id: id })
        })
        .then(() => res.status(204).json())
        .catch(err => res.json(err))
}

module.exports = {
    getPromotions,
    getPromotionById,
    postPromotion,
    patchPromotionById,
    deletePromotionById
}