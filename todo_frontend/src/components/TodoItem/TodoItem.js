import React, { useState } from 'react';
import { BsCheckCircleFill, BsCircle, BsTrash, BsPencil, BsCheck2, BsX } from 'react-icons/bs';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTask(todo.task);
  };

  const handleSave = () => {
    if (editTask.trim() && editTask.trim() !== todo.task) {
      onUpdate(todo._id, editTask.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTask(todo.task);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.done ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="todo-content">
        <button
          className="toggle-button"
          onClick={() => onToggle(todo._id)}
          disabled={isLoading}
          aria-label={todo.done ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.done ? (
            <BsCheckCircleFill className="icon check-icon" />
          ) : (
            <BsCircle className="icon circle-icon" />
          )}
        </button>

        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="edit-input"
              autoFocus
              maxLength={500}
            />
            <div className="edit-actions">
              <button
                className="save-button"
                onClick={handleSave}
                aria-label="Save"
              >
                <BsCheck2 />
              </button>
              <button
                className="cancel-button"
                onClick={handleCancel}
                aria-label="Cancel"
              >
                <BsX />
              </button>
            </div>
          </div>
        ) : (
          <p
            className={`todo-text ${todo.done ? 'strikethrough' : ''}`}
            onClick={handleEdit}
          >
            {todo.task}
          </p>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            className="action-button edit-button"
            onClick={handleEdit}
            disabled={isLoading || todo.done}
            aria-label="Edit task"
          >
            <BsPencil />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => onDelete(todo._id)}
            disabled={isLoading}
            aria-label="Delete task"
          >
            <BsTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;


