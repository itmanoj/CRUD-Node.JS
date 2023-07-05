const express = require('express');
const bodyParser = require('body-parser');

// In-memory data store
let users = [];

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Create a user
app.post('/users', (req, res) => {
  const { id, name, email } = req.body;
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
  console.log(newUser);
});

// Read all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Read a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
