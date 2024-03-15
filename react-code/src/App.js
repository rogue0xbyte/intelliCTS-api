import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './styles/styles.css'

import Dashboard from './components/Dashboard'
import Lookup from './components/Lookup'
import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/upload" element={<Dashboard/>}/>
          <Route exact path="/lookup" element={<Lookup/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
        </Routes>
    </Router>
  );
}

export default App;