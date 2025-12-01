const userResolvers = require('./userResolvers');
const courseResolvers = require('./courseResolvers');
const quizResolvers = require('./quizResolvers');
const gamificationResolvers = require('./gamificationResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
    ...quizResolvers.Query,
    ...gamificationResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...quizResolvers.Mutation,
    ...gamificationResolvers.Mutation
  }
};

module.exports = resolvers;
