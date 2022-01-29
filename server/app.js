const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/type-defs");
const resolvers = require("./graphql/resolvers");
const TwiDb = require("./db/connectDB");

// graphql sever
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

// start server
const start = async () => {
  try {
    await TwiDb.connect();
    server.listen().then(({ url }) => console.log(url));
  } catch (error) {
    console.log(error);
  }
};

start();

// .catch((err) => console.log(err));
