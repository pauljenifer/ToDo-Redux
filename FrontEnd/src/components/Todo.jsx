import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchTodos, 
  modifyTodo, 
  removeTodo, 
  clearMessages,
  selectFilteredTodos 
} from "../store/todoSlice";
import TodoStats from "./TodoStats";
import TodoFilters from "./TodoFilters";

function Todo() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const { loading, error, successMessage, items } = useSelector((state) => state.todos);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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

  // ✅ FIXED: Toggle complete function
  const toggleComplete = (todo) => {
    console.log('Toggle:', todo.title, 'Current:', todo.completed, 'New:', !todo.completed);
    dispatch(modifyTodo({ 
      id: todo._id, 
      data: { completed: !todo.completed }
    }));
  };

  const handleRemoveTodo = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      dispatch(removeTodo(id));
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.title);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      return;
    }
    dispatch(modifyTodo({ id, data: { title: editText } }));
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <div className="text-xl text-gray-600">Loading your tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <TodoStats />
        <TodoFilters />

        <div className="bg-yellow p-6 shadow-2xl rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            📝 Your Tasks
          </h2>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded animate-fade-in">
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-fade-in">
              <p className="font-medium">❌ {error}</p>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3 space-x-6">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-600 mb-2">No tasks found!</p>
                <p className="text-gray-500">Add your first task to get started.</p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo._id}
                  className={`group p-4 border-2 rounded-xl transition-all hover:shadow-lg m-6 ${
                    todo.completed 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(todo)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {todo.completed && <span className="text-white text-sm">✓</span>}
                    </button>

                    {/* Task Text / Edit Input */}
                    {editId === todo._id ? (
                      <input
                        className="flex-1 px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit(todo._id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => toggleComplete(todo)}
                        className={`flex-1 cursor-pointer select-none ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-800 font-medium'
                        }`}
                      >
                        {todo.title}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      {editId === todo._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(todo._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium"
                            disabled={loading}
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(todo)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium"
                            disabled={loading}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleRemoveTodo(todo._id, todo.title)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                            disabled={loading}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="mt-2 text-xs text-gray-500 pl-10">
                    Added: {new Date(todo.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;