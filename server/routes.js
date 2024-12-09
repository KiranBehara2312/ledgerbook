const express = require("express");
const connectDB = require("./db");
const router = express.Router();

// Example route to get all collections
router.get("/collections", async (req, res) => {
  try {
    // Get the database connection
    const db = await connectDB();

    // List collections
    const collections = await db.listCollections().toArray();

    // Map to get only the collection names
    const collectionNames = collections.map((collection) => collection.name);

    // Return the collection names
    res.json({ collections: collectionNames });
  } catch (error) {
    console.error("Error retrieving collections:", error);
    res.status(500).json({ error: "Failed to retrieve collections" });
  }
});

module.exports = router;
