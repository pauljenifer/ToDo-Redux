import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchQuery, clearAllCompleted } from "../store/todoSlice";

function TodoFilters() {
  const dispatch = useDispatch();
  const { filter, searchQuery, items } = useSelector((state) => state.todos);
  
  const completedCount = items.filter(todo => todo.completed).length;

  const filters = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'active', label: 'Active', icon: '⏳' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 p-6 rounded-xl shadow-xl mb-6 border border-white/20">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-white bg-white/90 backdrop-blur-sm shadow-md transition-all"
            />
            <span className="absolute left-3 top-3 text-gray-400 text-lg">🔍</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => dispatch(setFilter(f.value))}
              className={`px-5 py-3 rounded-lg font-medium transition-all shadow-lg ${
                filter === f.value
                  ? 'bg-white text-blue-600 shadow-xl scale-105 border-2 border-blue-200'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-2 border-white/20'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {/* Clear Completed */}
        {completedCount > 0 && (
          <button
            onClick={() => {
              if (window.confirm(`Delete all ${completedCount} completed tasks?`)) {
                dispatch(clearAllCompleted());
              }
            }}
            className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            🗑️ Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoFilters;