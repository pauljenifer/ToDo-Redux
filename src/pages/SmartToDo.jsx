import React,{useState} from 'react'


const SmartToDo = () => {
  const today = new Date().toLocaleDateString();
  const [task,setTask]=useState("");
  const [addTasks,setAddTasks]=useState([]);

  const totalTasks = addTasks.length;
const completedTasks = addTasks.filter(task => task.completed).length;
const pendingTasks = addTasks.filter(task => !task.completed).length;

    const handleAddTask = () => {
    if (task.trim() === "") return;

    setAddTasks([
      ...addTasks,
      {
        id: Date.now(),
        text: task,
        date: today,
        completed: false,
      },
    ]);

    setTask(""); // clear input
  };



  return (
    <div className='bg-emerald-500  flex  h-screen'>
        <div className='bg-emerald-300 w-64 p-12 h-full '>
          <ul className='gap-6 py-12 mt-4'>
            
                <li className='text-black text-2xl transition-transform duration-300 ease-in-out hover:scale-110'>About</li>
                  <li className='text-black text-2xl mt-7 transition-transform duration-300 ease-in-out hover:scale-110'>Setting</li>
                   <li className='text-black text-2xl mt-7 transition-transform duration-300 ease-in-out hover:scale-110'>Total Tasks : {addTasks.length}</li>
                    <li className='text-black text-2xl mt-7 transition-transform duration-300 ease-in-out hover:scale-110'>Pending Tasks :{pendingTasks}</li>
                    <li className='text-black text-2xl mt-7 transition-transform duration-300 ease-in-out hover:scale-110'>Completed Tasks : {completedTasks}</li>

            </ul>
          
        </div>
        <div className='bg-emerald-100 h-20 w-full '>
        <div className='flex flex-row gap-80'>
          
        <div className='text-6xl text-black'>Smart ToDo</div>
        <div className='flex gap-6'>
        <div className='text-4xl text-black mt-4'>Hello !</div>
        <div className="text-4xl text-black mt-4">Today: {today}</div>
        </div>

        </div>
        <div className='flex flex-col gap-7 p-15'>
          <p className='text-black text-xl px-0'>
            A Todo List application helps users organize their daily tasks in a simple and effective way. It allows users to add, view, update, and delete tasks, making it easier to manage time and stay productive. By keeping track of pending and completed tasks, users can focus better on their goals and improve daily efficiency.
          </p>
          <div className='flex flex-row gap-7'>
          <input type='text'placeholder='Add your Tasks' className='bg-white w-80 h-9'onChange={(e)=>setTask(e.target.value)}value={task}></input>
          <button className='border bg-amber-50 w-20' onClick={handleAddTask}>Add</button>
          
          </div>

             <div className="mt-6 space-y-3">
  {addTasks.map((todo) => (
    <label
      key={todo.id}
      className="flex items-center gap-3 bg-white p-4 rounded shadow cursor-pointer"
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="hidden peer"
        checked={todo.completed}
        onChange={() =>
          setAddTasks(
            addTasks.map((t) =>
              t.id === todo.id
                ? { ...t, completed: !t.completed }
                : t
            )
          )
        }
      />

      {/* Custom checkbox */}
      <span className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center
        peer-checked:bg-blue-600 peer-checked:border-blue-600">
        {todo.completed && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path
              d="M10.092.952L4.162 6.23 1.585 3.636"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        )}
      </span>

      {/* Task text */}
      <div className="flex flex-col">
        <p
          className={`text-lg ${
            todo.completed ? "line-through text-gray-400" : ""

          }`}
        >
          {todo.text}
        </p>
        <p className="text-sm text-gray-500">Date: {todo.date}</p>
      </div>
    </label>
  ))}
</div>

         
             



        </div>
        </div>





    </div>

  )
}

export default SmartToDo