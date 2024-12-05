const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Replace with your MongoDB URI
const mongoURI = process.env.MONGO_URI;

let client;
let db;

// Connect to MongoDB and ensure it is successful
MongoClient.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((dbClient) => {
    client = dbClient;
    db = client.db(); // Access the database after successful connection
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Route to get all collections
app.get("/collections", async (req, res) => {
  if (!db) {
    return res
      .status(500)
      .json({ error: "Database connection not established" });
  }

  try {
    // List collections
    const collections = await db.listCollections().toArray();

    // Map to get only the collection names
    const collectionNames = collections.map((collection) => collection.name);

    // Return the collection names as JSON
    res.json({ collections: collectionNames });
  } catch (error) {
    console.error("Error retrieving collections:", error);
    res.status(500).json({ error: "Failed to retrieve collections" });
  }
});

// Start the server after MongoDB connection is established
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
