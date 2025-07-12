const mongodb = require("../db/mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Retrieve all contacts from the database'
     #swagger.responses[200] = {
       description: 'Successfully retrieved all contacts',
       schema: {
         type: 'array',
         items: { $ref: '#/definitions/Contact' }
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  console.log("Fetching all contacts from the database");
  const db = mongodb.getDb();
  try {
    const contacts = await db.collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getContactById = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Retrieve a specific contact by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the contact',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.responses[200] = {
       description: 'Successfully retrieved the contact',
       schema: { $ref: '#/definitions/Contact' }
     }
     #swagger.responses[404] = {
       description: 'Contact not found'
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  const contactId = req.params.id;
  const db = mongodb.getDb();
  try {
    const contact = await db
      .collection("contacts")
      .findOne({ _id: ObjectId.createFromHexString(contactId) });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (err) {
    console.error("Error fetching contact by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Create a new contact'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Contact data',
       required: true,
       schema: { $ref: '#/definitions/Contact' }
     }
     #swagger.responses[201] = {
       description: 'Contact created successfully',
       schema: { $ref: '#/definitions/Contact' }
     }
     #swagger.responses[400] = {
       description: 'Bad request - invalid input'
     }
  */
  const newContact = req.body;

  // Validate that request body exists and is not empty
  if (!newContact || Object.keys(newContact).length === 0) {
    return res
      .status(400)
      .json({ error: "Request body is required and cannot be empty" });
  }

  const db = mongodb.getDb();
  try {
    const result = await db.collection("contacts").insertOne(newContact);
    const createdContact = { _id: result.insertedId, ...newContact };
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(createdContact);
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Update an existing contact by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the contact to update',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated contact data',
       required: true,
       schema: { $ref: '#/definitions/Contact' }
     }
     #swagger.responses[200] = {
       description: 'Contact updated successfully',
       schema: {
         type: 'object',
         properties: {
           message: {
             type: 'string',
             example: 'Contact updated successfully'
           }
         }
       }
     }
     #swagger.responses[404] = {
       description: 'Contact not found'
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  const contactId = req.params.id;
  const updatedContact = req.body;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("contacts")
      .updateOne(
        { _id: ObjectId.createFromHexString(contactId) },
        { $set: updatedContact }
      );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  /* #swagger.tags = ['Contacts']
     #swagger.description = 'Delete a contact by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the contact to delete',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.responses[200] = {
       description: 'Contact deleted successfully',
       schema: {
         type: 'object',
         properties: {
           message: {
             type: 'string',
             example: 'Contact deleted successfully'
           }
         }
       }
     }
     #swagger.responses[404] = {
       description: 'Contact not found'
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  const contactId = req.params.id;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: ObjectId.createFromHexString(contactId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
