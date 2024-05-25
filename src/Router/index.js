import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TodoPage from '../View/TodoPage'

export default function Router() {
  return (
    <Routes>
        <Route path='/todo' element={<TodoPage/>}></Route>

        <Route path='*' element={<Navigate to="/todo"/>} ></Route>
        
    </Routes>
  )
}
