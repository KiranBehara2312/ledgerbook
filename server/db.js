const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI from environment variables or fallback to a default URI
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hims';

// Connect to MongoDB using Mongoose
const connectToMongoDB = async () => {
  try {
    // Check if the Mongoose connection is already established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,  // Timeout after 30 seconds
      });
      console.log('Connected to MongoDB using Mongoose');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

// Export the connection function to be used in other files
module.exports = connectToMongoDB;
