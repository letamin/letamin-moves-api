const { Contact } = require('../../../../models/Contact');

const getContacts = (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json(contacts)
        })
        .catch(err => res.json(err))
}

const getContactById = (req, res, next) => {
    const { id } = req.params;

    Contact.findById(id)
        .then(contact => {
            res.status(200).json(contact)
        })
        .catch(err => res.json(err))
}

const postContact = (req, res, next) => {
    const { email, name, phone, subject, message } = req.body;

    const newContact = new Contact({ email, name, phone, subject, message });
    newContact.save()
        .then(contact => {
            res.status(201).json(contact)
        })
        .catch(err => res.json(err))
}

const deleteContactById = (req, res, next) => {
    const { id } = req.params;

    Contact.findById(id)
        .then(contact => {
            if (!contact) {
                return Promise.reject({
                    status: 404,
                    message: "Not found."
                })
            }

            return Contact.deleteOne({ _id: id })
        })
        .then(() => res.status(204).json())
        .catch(err => res.json(err))
}

module.exports = {
    getContacts,
    getContactById,
    postContact,
    deleteContactById
}