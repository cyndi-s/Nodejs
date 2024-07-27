const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to return login credentials
app.get('/login', (req, res) => {
  res.json({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });
});

// Endpoint to return users data
app.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, 'data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
