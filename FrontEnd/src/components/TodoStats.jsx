import { useSelector } from "react-redux";
import { selectStats } from "../store/todoSlice";

function TodoStats() {
  const stats = useSelector(selectStats);
  const { loading } = useSelector((state) => state.todos);

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-2xl mb-6 border border-white/20">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📊 Task Statistics
        {loading && (
          <span className="text-sm animate-pulse bg-white/20 px-3 py-1 rounded-full">
            Syncing...
          </span>
        )}
      </h3>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-yellow p-5 rounded-xl text-center backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all hover:scale-105 shadow-lg">
          <div className="text-4xl font-bold">{stats.total}</div>
          <div className="text-sm opacity-90 font-medium mt-1">Total</div>
        </div>
        
        <div className="bg-white/20 p-5 rounded-xl text-center backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all hover:scale-105 shadow-lg">
          <div className="text-4xl font-bold text-yellow-300">{stats.active}</div>
          <div className="text-sm opacity-90 font-medium mt-1">Active</div>
        </div>
        
        <div className="bg-white/20 p-5 rounded-xl text-center backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all hover:scale-105 shadow-lg">
          <div className="text-4xl font-bold text-green-300">{stats.completed}</div>
          <div className="text-sm opacity-90 font-medium mt-1">Completed</div>
        </div>
        
        <div className="bg-white/20 p-5 rounded-xl text-center backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all hover:scale-105 shadow-lg">
          <div className="text-4xl font-bold text-cyan-300">{completionRate}%</div>
          <div className="text-sm opacity-90 font-medium mt-1">Progress</div>
        </div>
      </div>
      
      {stats.total > 0 && (
        <div className="mt-6">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden shadow-inner border border-white/30">
            <div 
              className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 h-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-center text-sm mt-2 text-white/80">
            {completionRate === 100 ? '🎉 All tasks completed!' : `Keep going! ${100 - completionRate}% remaining`}
          </p>
        </div>
      )}
    </div>
  );
}

export default TodoStats;