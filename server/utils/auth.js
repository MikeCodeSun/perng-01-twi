const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

const auth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Error", { errorMsg: "No Header Token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.SECRET);
    return user;
  } catch (error) {
    // console.log(error);
    throw new AuthenticationError("Error", {
      errorMsg: "Not right Auth",
    });
  }
};

module.exports = auth;
