const Pool = require("pg").Pool;
require("dotenv").config();

// connect postgres database
const TwiDb = new Pool({
  host: "localhost",
  port: "5432",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

module.exports = TwiDb;
