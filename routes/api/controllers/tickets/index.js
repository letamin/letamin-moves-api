const express = require("express");
const ticketController = require("./ticket.controller");
const router = express.Router();
const { authenticate } = require('../../../../middlewares/auth/index')

router.post('/', authenticate, ticketController.postTicket);

module.exports = router;