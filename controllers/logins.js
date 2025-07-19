const mongodb = require("../db/mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAllLogins = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const logins = await db.collection("logins").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(logins);
  } catch (err) {
    console.error("Error fetching logins:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLoginById = async (req, res) => {
  const loginId = req.params.id;
  const db = mongodb.getDb();
  try {
    const login = await db
      .collection("logins")
      .findOne({ _id: ObjectId.createFromHexString(loginId) });
    if (!login) {
      return res.status(404).json({ error: "login not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(login);
  } catch (err) {
    console.error("Error fetching login by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createLogin = async (req, res) => {
  const newlogin = req.body;

  const db = mongodb.getDb();
  try {
    const result = await db.collection("logins").insertOne(newlogin);
    const createdlogin = { _id: result.insertedId, ...newlogin };
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(createdlogin);
  } catch (err) {
    console.error("Error creating login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateLogin = async (req, res) => {
  const loginId = req.params.id;
  const updatedlogin = req.body;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("logins")
      .updateOne(
        { _id: ObjectId.createFromHexString(loginId) },
        { $set: updatedlogin }
      );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "login not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "login updated successfully" });
  } catch (err) {
    console.error("Error updating login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteLogin = async (req, res) => {
  const loginId = req.params.id;
  const db = mongodb.getDb();
  try {
    const result = await db
      .collection("logins")
      .deleteOne({ _id: ObjectId.createFromHexString(loginId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "login not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "login deleted successfully" });
  } catch (err) {
    console.error("Error deleting login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllLogins,
  getLoginById,
  createLogin,
  updateLogin,
  deleteLogin,
};
