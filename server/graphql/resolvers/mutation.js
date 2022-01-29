const { creatUserValidator, loginValidator } = require("../../utils/validator");
const { UserInputError } = require("apollo-server");
const TwiDb = require("../../db/connectDB");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../../utils/auth");

const mutationResolvers = {
  Mutation: {
    // register user
    createUser: async (_, args) => {
      // console.log(args.input);
      const { name, email, password } = args.input;
      const { valid, errorMsg } = creatUserValidator(name, email, password);
      // console.log(valid, errorMsg);
      if (!valid) {
        throw new UserInputError("Error", { errorMsg });
      }

      const existUser = await TwiDb.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
      // console.log(existUser.rows.length);
      if (existUser.rows.length > 0) {
        throw new UserInputError("error", {
          errorMsg:
            "Email already existed, please change another one ,Try again",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);
      // console.log(hashPassword);

      const data = await TwiDb.query(
        "INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *",
        [name, email, hashPassword]
      );
      const newUser = data.rows[0];
      // console.log(newUser);

      const token = jwt.sign(
        { id: newUser.user_id, name, email },
        process.env.SECRET,
        {
          expiresIn: "1d",
        }
      );
      // console.log(token);

      newUser.token = token;
      // console.log(newUser);

      return newUser;
    },
    // login user
    loginUser: async (_, args) => {
      const { email, password } = args.input;
      const { valid, errorMsg } = loginValidator(email, password);
      if (!valid) {
        throw new UserInputError("Error", { errorMsg });
      }
      const existData = await TwiDb.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
      if (existData.rows.length === 0) {
        throw new UserInputError("Error", {
          errorMsg: { user: "User not exist" },
        });
      }
      const user = existData.rows[0];
      const isValid = await bcryptjs.compare(password, user.password);
      // console.log(isValid);
      if (!isValid) {
        throw new UserInputError("Error", {
          errorMsg: { password: "Password not right" },
        });
      }

      const token = jwt.sign(
        { id: user.user_id, name: user.name, email: user.email },
        process.env.SECRET,
        { expiresIn: "1d" }
      );

      user.token = token;
      // console.log(user);

      return user;
    },
    //create post
    createPost: async (_, args, context) => {
      const { body } = args.input;
      // console.log(context.req.headers.authorization);
      const user = auth(context);
      // console.log(user);
      if (body.trim() === "") {
        throw new UserInputError("Error", {
          errorMsg: { post: "Post is Empty" },
        });
      }
      const data = await TwiDb.query(
        "INSERT INTO post (body, creater, creater_name) VALUES($1, $2, $3) RETURNING *",
        [body, user.id, user.name]
      );

      return data.rows[0];
    },
    // delete post
    deletePost: async (_, args, context) => {
      const user = auth(context);
      const id = args.id;
      // console.log(id, user.id);
      const data = await TwiDb.query(
        "DELETE FROM post WHERE post_id=$1 AND creater=$2 RETURNING *",
        [id, user.id]
      );
      if (data.rows.length < 1) {
        throw new UserInputError("Error", { errorMsg: "Post not exit" });
      }

      return data.rows[0];
    },
    // update post
    updatePost: async (_, args, context) => {
      const user = auth(context);
      const { id, body } = args;
      if (!id) {
        throw new UserInputError("Error", { errorMsg: "post not exist" });
      }
      if (body.trim() === "") {
        throw new UserInputError("Error", {
          errorMsg: { post: "post is empty" },
        });
      }

      const data = await TwiDb.query(
        "UPDATE post SET body=$1 WHERE post_id=$2 AND creater=$3 RETURNING *",
        [body, id, user.id]
      );

      return data.rows[0];
    },
  },
};

module.exports = mutationResolvers;
