const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/diary.json');

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, '[]', 'utf8');
}

function getAll() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function save(entries) {
  fs.writeFileSync(DB_PATH, JSON.stringify(entries, null, 2), 'utf8');
}

function getByUser(userId) {
  return getAll().filter(e => e.userId === userId);
}

function addEntry(userId, food) {
  const entries = getAll();
  const entry = {
    id: Date.now().toString(),
    userId,
    foodName: food.name,
    calories: food.calories || 0,
    proteins: food.proteins || 0,
    carbs: food.carbs || 0,
    fats: food.fats || 0,
    date: new Date().toISOString()
  };
  entries.push(entry);
  save(entries);
  return entry;
}

function deleteEntry(id, userId) {
  const entries = getAll().filter(e => !(e.id === id && e.userId === userId));
  save(entries);
}

module.exports = { getByUser, addEntry, deleteEntry };
