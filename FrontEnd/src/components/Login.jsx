import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearMessages } from "../store/todoSlice";
import { useNavigate } from "react-router-dom";
import TodoStats from "./TodoStats";

function Login() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.todos);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      return;
    }
    await dispatch(addTodo({ title: task }));
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <TodoStats />
        
        <div className="bg-white/95 backdrop-blur-sm p-8 shadow-2xl rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            ➕ Add New Task
          </h2>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 text-green-800 rounded-lg animate-fade-in shadow-md">
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-100 to-pink-100 border-l-4 border-red-500 text-red-800 rounded-lg animate-fade-in shadow-md">
              <p className="font-medium">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleAddTask}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Description
              </label>
              <input
                type="text"
                placeholder="Enter your task here..."
                className="w-full px-8 py-5 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gradient-to-r from-purple-50 to-pink-50"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
                disabled={loading || !task.trim()}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Adding...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    ➕ Add Task
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                📋 View All
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;