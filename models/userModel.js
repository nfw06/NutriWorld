const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../data/users.json');

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, '[]', 'utf8');
}

function getAll() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function save(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
}

function findByUsername(username) {
  return getAll().find(u => u.username === username);
}

function findById(id) {
  return getAll().find(u => u.id === id);
}

function create(username, password) {
  const users = getAll();
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashed,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  save(users);
  return newUser;
}

function validatePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { findByUsername, findById, create, validatePassword };
