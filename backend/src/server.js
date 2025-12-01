const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./graphql/schema');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./middleware/auth');
const { setupRealTimeChat } = require('./services/chatService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/khan-academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Create HTTP server for WebSockets
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Setup real-time chat
setupRealTimeChat(io);

// Apollo Server Setup
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
      io
    })
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
