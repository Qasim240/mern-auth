

import React from 'react'
import SignUp from './pages/SignUp'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App