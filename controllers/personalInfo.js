const mongodb = require("../db/mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAllPersonalInfo = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const personalInfo = await db.collection("personal_info").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(personalInfo);
  } catch (err) {
    console.error("Error fetching personal info:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPersonalInfoById = async (req, res) => {
  const personalInfoId = req.params.id;
  const db = mongodb.getDb();
  try {
    const personalInfo = await db
      .collection("personal_info")
      .findOne({ _id: ObjectId.createFromHexString(personalInfoId) });
    if (!personalInfo) {
      return res.status(404).json({ error: "personal info not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(personalInfo);
  } catch (err) {
    console.error("Error fetching personal info by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPersonalInfo = async (req, res) => {
  const newPersonalInfo = req.body;

  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("personal_info")
      .insertOne(newPersonalInfo);
    const createdPersonalInfo = { _id: result.insertedId, ...newPersonalInfo };
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(createdPersonalInfo);
  } catch (err) {
    console.error("Error creating personal info:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePersonalInfo = async (req, res) => {
  const personalInfoId = req.params.id;
  const updatedPersonalInfo = req.body;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("personal_info")
      .updateOne(
        { _id: ObjectId.createFromHexString(personalInfoId) },
        { $set: updatedPersonalInfo }
      );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "personal info not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "personal info updated successfully" });
  } catch (err) {
    console.error("Error updating personal info:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePersonalInfo = async (req, res) => {
  const personalInfoId = req.params.id;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("personal_info")
      .deleteOne({ _id: ObjectId.createFromHexString(personalInfoId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "personal info not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "personal info deleted successfully" });
  } catch (err) {
    console.error("Error deleting personal info:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllPersonalInfo,
  getPersonalInfoById,
  createPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
