const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo
} = require('../controllers/todoController');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

module.exports = router;


