const express = require('express');
const movieController = require('./movie.controller');
const router = express.Router();
const { authenticate, authorize } = require('../../../../middlewares/auth/index');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.get('/status/:status', movieController.getMoviesByStatus);
router.post('/', authenticate, authorize(["admin"]), movieController.postMovie);
router.patch('/:id', authenticate, authorize(["admin"]), movieController.patchMovieById);
router.delete('/:id', authenticate, authorize(["admin"]), movieController.deleteMovieById);

module.exports = router;

