const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let db;

const initDb = (callback) => {
  if (db) {
    console.warn("Database is already initialized!");
    return callback(null, db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client.db();
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw Error("Database not initialized");
  }
  return db;
};

module.exports = {
  initDb,
  getDb,
};
