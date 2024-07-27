// updated on Sat
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

// Endpoint to return the login credentials
app.get('/login', (req, res) => {
  const credentials = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  };
  res.json(credentials);
});

// Endpoint to return users
app.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, 'data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read users data' });
      return;
    }
    const users = JSON.parse(data);
    const filteredUsers = users.map(user => ({
      name: user.name,
      email: user.email,
      username: user.username
    }));
    res.json(filteredUsers);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
