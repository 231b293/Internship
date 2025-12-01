const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/todos.json');
const DATA_DIR = path.dirname(DATA_FILE);

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore error
  }
};

// Read todos from file
const readTodos = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
};

// Write todos to file
const writeTodos = async (todos) => {
  try {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Failed to write todos: ${error.message}`);
  }
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  readTodos,
  writeTodos,
  generateId
};

