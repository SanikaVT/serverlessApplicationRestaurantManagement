import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/signin";
import USignUp from "./components/signup/SignUp";
import LogOut from "./components/logout";
import Dashboard from "./components/dashboard";
import RealTimeChat from './components/real-time-chat/RealTimeChat'

import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<USignUp />}></Route>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/logout" element={<LogOut />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/chat" element={<RealTimeChat />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
