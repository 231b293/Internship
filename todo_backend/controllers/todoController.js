const { readTodos, writeTodos, generateId } = require('../storage/fileStorage');
const Todo = require('../models/Todo');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await readTodos();
    // Sort by createdAt descending (newest first)
    const sortedTodos = todos.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json({
      success: true,
      data: sortedTodos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task || task.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task is required'
      });
    }

    const todoData = {
      _id: generateId(),
      task: task.trim(),
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const todo = new Todo(todoData);
    todo.validate();

    const todos = await readTodos();
    todos.push(todo.toJSON());
    await writeTodos(todos);

    res.status(201).json({
      success: true,
      data: todo.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

// Update a todo task
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task || task.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task is required'
      });
    }

    const todos = await readTodos();
    const todoIndex = todos.findIndex(t => t._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const todo = new Todo({
      ...todos[todoIndex],
      task: task.trim(),
      updatedAt: new Date().toISOString()
    });
    todo.validate();

    todos[todoIndex] = todo.toJSON();
    await writeTodos(todos);

    res.status(200).json({
      success: true,
      data: todo.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

// Toggle todo completion status
const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await readTodos();
    const todoIndex = todos.findIndex(t => t._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const todo = new Todo({
      ...todos[todoIndex],
      done: !todos[todoIndex].done,
      updatedAt: new Date().toISOString()
    });

    todos[todoIndex] = todo.toJSON();
    await writeTodos(todos);

    res.status(200).json({
      success: true,
      data: todo.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling todo',
      error: error.message
    });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await readTodos();
    const todoIndex = todos.findIndex(t => t._id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    await writeTodos(todos);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo
};
