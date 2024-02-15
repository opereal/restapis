require("dotenv").config();

const envVariables = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
};

module.exports = envVariables;
