const mongoose = require("mongoose");
const envVariables = require("../constants/index");

const connectDatabase = async () => {
  await mongoose
    .connect(envVariables.DB_URI)
    .then(() => console.log("database connected successfully"))
    .catch((error) => console.log("connection failed"));
};

module.exports = connectDatabase;
