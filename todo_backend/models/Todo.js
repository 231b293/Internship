// Simple Todo model for file-based storage
class Todo {
  constructor(data) {
    this._id = data._id || null;
    this.task = data.task || '';
    this.done = data.done || false;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Validate todo data
  validate() {
    if (!this.task || this.task.trim() === '') {
      throw new Error('Task is required');
    }
    if (this.task.length > 500) {
      throw new Error('Task cannot exceed 500 characters');
    }
    return true;
  }

  // Convert to plain object
  toJSON() {
    return {
      _id: this._id,
      task: this.task,
      done: this.done,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Todo;
