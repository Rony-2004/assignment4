const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers-prisma");
const { initializeDatabase } = require("./database-prisma");
const config = require("./config");

const app = express();

// Enable CORS with configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database with sample data
    await initializeDatabase();
    
    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // You can add authentication context here later
        return { req };
      },
    });

    // Start Apollo Server
    await server.start();
    
    // Apply middleware
    server.applyMiddleware({ 
      app, 
      path: config.graphqlPath,
      playground: config.enableGraphQLPlayground
    });

    // Basic health check endpoint
    app.get("/", (req, res) => {
      res.json({ 
        message: "EdTech API is running!",
        environment: config.nodeEnv,
        graphqlEndpoint: config.graphqlPath,
        timestamp: new Date().toISOString()
      });
    });

    // Start Express server
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📊 GraphQL endpoint: http://localhost:${config.port}${config.graphqlPath}`);
      if (config.enableGraphQLPlayground) {
        console.log(`🔧 GraphQL Playground: http://localhost:${config.port}${config.graphqlPath}`);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer(); 