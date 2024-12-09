const express = require("express");
const connectDB = require("./db");
const cors = require('cors')
const routes = require("./routes");
const bodyParser = require("body-parser");
const authoutes = require("./auth/routes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.json());
// Use the routes
app.use("/api", routes);
app.use("/auth", authoutes);

// Start the server after MongoDB connection is established
const startServer = async () => {
  try {
    await connectDB();  // Wait for DB connection
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (err) {
    console.error('Error starting the server:', err.message);
  }
};

startServer();