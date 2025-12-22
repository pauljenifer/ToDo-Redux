// import React from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SmartToDo from 'E:/Frontend/Smart ToDo/src/pages/SmartToDo.jsx'
// import SmartToDoLogin from './pages/SmartToDoLogin';

// const App = () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//            <SmartToDo/>
//            <SmartToDoLogin/>
//     </Routes>
//     </BrowserRouter>

//   )
// }

// export default App

import { Routes, Route } from "react-router-dom";
import SmartToDoLogin from "E:/Frontend/Smart ToDo/src/pages/SmartToDoLogin.jsx";
import SmartToDo from "E:/Frontend/Smart ToDo/src/pages/SmartToDo.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<SmartToDoLogin />} />
      <Route path="/todo" element={<SmartToDo/>} />
    </Routes>
  );
}

export default App;
