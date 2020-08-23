const express = require('express');
const movieDateController = require('./date.controller');
const router = express.Router();

router.get('/all/:time', movieDateController.getMovies);

module.exports = router;

