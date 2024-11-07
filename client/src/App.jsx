

import React from 'react'

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SignUp from './components/admin/pages/SignUp';
import Login from './components/admin/pages/Login';
import Dashboard from './components/admin/pages/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';
const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* protected Routes */}
          <Route element={<ProtectedRoutes />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App