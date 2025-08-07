require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  dbPath: process.env.DB_PATH || './src/edtech.db',
  
  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // GraphQL Configuration
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
  
  // Security
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  sessionSecret: process.env.SESSION_SECRET || 'dev-session-secret',
  
  // Feature Flags
  enableCors: process.env.ENABLE_CORS !== 'false',
  enableGraphQLPlayground: process.env.NODE_ENV !== 'production',
};

module.exports = config; 