const express = require('express');
const cinemaController = require('./cinema.controller');
const router = express.Router();
const { authenticate, authorize } = require('../../../../middlewares/auth/index');

router.get('/', cinemaController.getCinemas);
router.get('/:id', cinemaController.getCinemaById);
router.get('/location/:province', cinemaController.getCinemaByProvince);
router.post('/', authenticate, authorize(["admin"]), cinemaController.postCinema);
router.patch('/:id', authenticate, authorize(["admin"]), cinemaController.patchCinema);
router.delete('/:id', authenticate, authorize(["admin"]), cinemaController.deleteCinemaById);

module.exports = router;

