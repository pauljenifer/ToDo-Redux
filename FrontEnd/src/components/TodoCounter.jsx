import { useSelector } from "react-redux";

function TodoCounter() {
  // 🔴 This component reads from Redux store
  const { items, loading } = useSelector((state) => state.todos);
  
  const completedCount = items.filter(todo => todo.completed).length;
  const pendingCount = items.filter(todo => !todo.completed).length;

  return (
    <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-6 rounded-xl mb-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
        📊 Redux State Monitor
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Live</span>
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all">
          <div className="text-3xl font-bold text-white">{items.length}</div>
          <div className="text-sm text-white/90 font-medium">Total Tasks</div>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all">
          <div className="text-3xl font-bold text-green-300">{completedCount}</div>
          <div className="text-sm text-white/90 font-medium">Completed</div>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all">
          <div className="text-3xl font-bold text-orange-300">{pendingCount}</div>
          <div className="text-sm text-white/90 font-medium">Pending</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-white/80 text-center bg-white/10 py-2 rounded-lg">
        {loading ? "⏳ Redux is loading..." : "✅ Redux state active"}
      </div>
    </div>
  );
}

export default TodoCounter;