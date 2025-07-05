const mongodb = require('../db/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  console.log('Fetching all contacts from the database');
  const db = mongodb.getDb();
  try {
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  const db = mongodb.getDb();
  try {
    const contact = await db.collection('contacts').findOne({ _id: ObjectId.createFromHexString(contactId) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
