const express = require('express');
const promotionController = require('./promotion.controller');
const { authenticate, authorize } = require('../../../../middlewares/auth')
const router = express.Router();

router.get('/', promotionController.getPromotions);
router.get('/:id', promotionController.getPromotionById);
router.post('/', authenticate, authorize(["admin"]), promotionController.postPromotion);
router.patch('/:id', authenticate, authorize(["admin"]), promotionController.patchPromotionById);
router.delete('/:id', authenticate, authorize(["admin"]), promotionController.deletePromotionById);

module.exports = router;