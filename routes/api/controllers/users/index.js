const userController = require('./user.controller');
const express = require('express');
const router = express.Router();
const { validatePostUser } = require('../../../../middlewares/validation/users/postUser');

router.post('/', validatePostUser, userController.postUser);
router.post('/login', userController.login);

module.exports = router;