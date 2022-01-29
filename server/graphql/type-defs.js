const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    user_id: ID!
    name: String!
    email: String!
    password: String!
    create_at: String!
    token: String!
  }

  type Post {
    post_id: ID!
    body: String!
    create_at: String!
    creater: ID!
    creater_name: String!
  }

  input userInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input postInput {
    body: String!
  }

  type Query {
    hello: String
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    searchPost(body: String!): [Post!]!
  }

  type Mutation {
    createUser(input: userInput!): User!
    loginUser(input: loginInput!): User!
    createPost(input: postInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, body: String!): Post!
  }
`;

module.exports = typeDefs;
