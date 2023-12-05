import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchAppBar from './components/addtodolist.tsx';
// import TodoList from './components/todolist.js';



function routes() {
  return (
    <div className="routes">
      <SearchAppBar />
      
      <>
        <BrowserRouter>
          <Routes>
            
           
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default routes;