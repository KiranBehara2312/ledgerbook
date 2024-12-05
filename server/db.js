const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;
let db;

// MongoDB URI from environment variables or fallback to a default URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    if (!client) {
      client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      db = client.db(); // Get the database after successful connection
      console.log('Connected to MongoDB');
    }
    return db; // Return the db instance
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

// Export the connection function to be used in other files
module.exports = connectToMongoDB;
