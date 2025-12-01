import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onUpdate, onDelete, isLoading }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>No tasks yet</h2>
        <p>Add a new task to get started!</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.done).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list-container">
      {totalCount > 0 && (
        <div className="todo-stats">
          <span className="stat-item">
            Total: <strong>{totalCount}</strong>
          </span>
          <span className="stat-item">
            Completed: <strong>{completedCount}</strong>
          </span>
          <span className="stat-item">
            Pending: <strong>{totalCount - completedCount}</strong>
          </span>
        </div>
      )}

      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;


