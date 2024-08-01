const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose
    .connect("mongodb://localhost:27017/redis")
    .then(() => console.log("connected to database"))
    .catch(() => console.log("failed to connect to database"));
}

module.exports = connectToDatabase;
