const express = require('express');
const contactController = require('./contact.controller');
const router = express.Router();
const { validateContact } = require('../../../../middlewares/validation/contacts/postContact');
const { authenticate, authorize } = require('../../../../middlewares/auth/index');

router.get('/', authenticate, authorize(['admin']), contactController.getContacts);
router.get('/:id', authenticate, authorize(['admin']), contactController.getContactById);
router.post('/', authenticate, validateContact, contactController.postContact);
router.delete('/:id', authenticate, authorize(['admin']), contactController.deleteContactById);

module.exports = router;