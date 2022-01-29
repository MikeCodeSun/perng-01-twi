const resolvesQuery = require("./query");
const mutationResolvers = require("./mutation");

const resolvers = {
  Query: {
    ...resolvesQuery.Query,
  },
  Mutation: {
    ...mutationResolvers.Mutation,
  },
};

module.exports = resolvers;
