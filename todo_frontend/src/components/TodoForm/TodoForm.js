import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, isLoading }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!task.trim()) {
      setError('Please enter a task');
      return;
    }

    try {
      await onAddTodo(task.trim());
      setTask('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="todo-form-container">
      <h1 className="app-title">
        <span className="title-icon">✓</span>
        Todo App
      </h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className={`todo-input ${error ? 'error' : ''}`}
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            className="add-button"
            disabled={isLoading || !task.trim()}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TodoForm;


