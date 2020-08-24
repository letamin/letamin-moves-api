const express = require('express');
const posterController = require('./poster.controller');
const router = express.Router();
const { authenticate, authorize } = require('../../../../middlewares/auth');

router.get('/', posterController.getPosters);
router.get('/:id', posterController.getPosterById);
router.post('/', authenticate, authorize(['admin']), posterController.postPoster);
router.patch('/:id', authenticate, authorize(['admin']), posterController.patchPosterById);
router.delete('/:id', authenticate, authorize(['admin']), posterController.deletePosterById);

module.exports = router;