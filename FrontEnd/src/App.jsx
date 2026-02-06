import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./components/Login";
import Todo from "./components/Todo";
import "./App.css";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <h1 className="text-xl font-bold">Redux Todo App</h1>
          </div>
          
          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              ➕ Add Task
            </Link>
            <Link
              to="/tasks"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/tasks')
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              📋 View Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<Todo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;