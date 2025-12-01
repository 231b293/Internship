# Modern Todo App - Restructured

A beautiful, modern Todo application built with React and Node.js, featuring file-based storage and a clean architecture.

## 🚀 Features

- ✨ Modern, responsive UI with smooth animations
- ✅ Add, edit, delete, and toggle todos
- 📊 Task statistics (total, completed, pending)
- 🔄 Real-time updates
- ⚡ Loading states and error handling
- ⌨️ Keyboard shortcuts (Enter to save, Escape to cancel)
- 📱 Fully responsive design
- 🎨 Beautiful gradient theme

## 📁 Project Structure

### Backend Structure
```
todo_backend/
├── controllers/
│   └── todoController.js    # Todo business logic
├── data/
│   └── todos.json           # JSON file storage (created automatically)
├── middleware/
│   └── errorHandler.js      # Global error handling
├── models/
│   └── Todo.js              # Todo data model
├── routes/
│   └── todoRoutes.js        # API routes
├── storage/
│   └── fileStorage.js       # File storage utilities
├── server.js                # Express server setup
└── package.json
```

### Frontend Structure
```
todo_frontend/
├── src/
│   ├── components/
│   │   ├── TodoForm/        # Task creation form
│   │   ├── TodoList/        # Todo list container
│   │   ├── TodoItem/        # Individual todo item
│   │   ├── LoadingSpinner/  # Loading indicator
│   │   └── ErrorMessage/    # Error display component
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.js               # Main app component
│   ├── App.css              # App styles
│   └── index.js             # Entry point
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- No database required - uses JSON file storage

### Backend Setup

1. Navigate to the backend directory:
```bash
cd TODO/todo_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd TODO/todo_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

All endpoints are prefixed with `/api/todos`

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo task
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/health` - Health check endpoint

## 🎨 Key Improvements

### Backend
- ✅ RESTful API structure with proper routes and controllers
- ✅ Centralized error handling
- ✅ Input validation
- ✅ Environment variable support
- ✅ Better response structure
- ✅ Improved error messages

### Frontend
- ✅ Component-based architecture
- ✅ Service layer for API calls
- ✅ Loading and error states
- ✅ Modern UI with gradients and animations
- ✅ Better UX with keyboard shortcuts
- ✅ Responsive design
- ✅ Task statistics
- ✅ Smooth transitions and hover effects

## 🎯 Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Add tasks using the input field
4. Click the circle icon to mark tasks as complete
5. Click the pencil icon to edit tasks
6. Click the trash icon to delete tasks
7. Use Enter to save edits, Escape to cancel

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js, File System (JSON storage)
- **Frontend**: React.js, Axios, React Icons
- **Styling**: CSS3 with modern features (gradients, animations, flexbox)
- **Storage**: JSON file-based storage (no database required)

## 📝 Notes

- **File Storage**: All todos are stored in `data/todos.json` file
- The data file is created automatically when you first run the app
- The `data/` directory is gitignored by default to keep your todos private
- All API responses follow a consistent structure with `success` and `data` fields
- The frontend includes proper error handling and user feedback
- The UI is fully responsive and works on mobile devices
- No database installation or setup required - just run and go!

