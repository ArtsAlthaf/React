const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.use(bodyParser.json());

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[index] = { ...users[index], ...updateUser };
  res.json(users[index]);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
