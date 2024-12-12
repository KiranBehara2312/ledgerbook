require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");
let connection;

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI; 
    connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("MongoDB Connected Successfully!");
      return connection.connection.db;
    }
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
