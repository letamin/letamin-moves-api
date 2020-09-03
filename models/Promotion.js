const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    image: { type: String, required: true },
    endTime: { type: Date, required: true }
})

const Promotion = mongoose.model('Promotion', PromotionSchema, 'Promotion');

module.exports = {
    PromotionSchema, Promotion
}