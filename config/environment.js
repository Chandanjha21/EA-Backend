// config/environment.js

require('dotenv').config();

const requiredEnv = [
  'NODE_ENV',
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'EMAIL_SERVICE_API_KEY'
];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error(`Error: Missing environment variable ${env}`);
    process.exit(1); // Exit if a required variable is missing
  }
});

const ENV = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  emailServiceApiKey: process.env.EMAIL_SERVICE_API_KEY,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
};

module.exports = ENV;
