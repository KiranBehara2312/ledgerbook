const express = require('express');
const connectToMongoDB = require('./db'); 
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Use the routes
app.use('/api', routes);

// Start the server after MongoDB connection is established
connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at PORT: ${port}`);
  });
}).catch((err) => {
  console.error('Server failed to start due to MongoDB connection failure:---------->   ', err);
});
