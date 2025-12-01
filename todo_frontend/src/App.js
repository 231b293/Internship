import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { todoService } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await todoService.getAllTodos();
      if (response.success) {
        setTodos(response.data);
      } else {
        setError('Failed to load todos');
      }
    } catch (err) {
      setError('Failed to load todos. Please check your connection.');
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (task) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await todoService.createTodo(task);
      if (response.success) {
        setTodos(prevTodos => [response.data, ...prevTodos]);
      } else {
        setError('Failed to add todo');
      }
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      setError(null);
      const response = await todoService.toggleTodo(id);
      if (response.success) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? response.data : todo
          )
        );
      } else {
        setError('Failed to update todo');
      }
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleUpdateTodo = async (id, task) => {
    try {
      setError(null);
      const response = await todoService.updateTodo(id, task);
      if (response.success) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? response.data : todo
          )
        );
      } else {
        setError('Failed to update todo');
      }
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      const response = await todoService.deleteTodo(id);
      if (response.success) {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      } else {
        setError('Failed to delete todo');
      }
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <TodoForm onAddTodo={handleAddTodo} isLoading={isSubmitting} />
        
        {error && (
          <ErrorMessage message={error} onRetry={fetchTodos} />
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default App;
