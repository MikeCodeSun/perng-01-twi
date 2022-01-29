// const { creatUserValidator, loginValidator } = require("../../utils/validator");
// const { UserInputError } = require("apollo-server");
const { UserInputError } = require("apollo-server");
const TwiDb = require("../../db/connectDB");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const resolvesQuery = {
  Query: {
    hello: () => "hello",
    // users
    users: async () => {
      const data = await TwiDb.query("SELECT * FROM users");
      return data.rows;
    },
    // user
    user: async (_, args) => {
      const id = args.id;
      const data = await TwiDb.query("SELECT * FROM users WHERE user_id=$1", [
        id,
      ]);
      return data.rows[0];
    },
    // all post
    posts: async () => {
      const data = await TwiDb.query("SELECT * FROM post");
      return data.rows;
    },
    // single post
    post: async (_, args) => {
      const id = args.id;
      const data = await TwiDb.query("SELECT * FROM post WHERE post_id=$1 ", [
        id,
      ]);

      return data.rows[0];
    },
    //search post
    searchPost: async (_, args) => {
      const { body } = args;
      if (body.trim() === "") {
        throw new UserInputError("Error", {
          errorMsg: { post: "search is empty" },
        });
      }
      const data = await TwiDb.query("SELECT * FROM post WHERE body ~* $1", [
        body,
      ]);
      if (data.rows.length < 1) {
        throw new UserInputError("Error", {
          errorMsg: { seach: "No Search Matched" },
        });
      }
      return data.rows;
    },
  },
};

module.exports = resolvesQuery;
