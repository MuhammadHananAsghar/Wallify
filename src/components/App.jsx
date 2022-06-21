import React from "react";
import "../styles/App.css";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Main } from './Main';
import { NavState } from "../contexts/NavbarContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


const App = () => {
  return (
    <div className="mainContainer">
      <Router>
      <NavState>
        <Sidebar />
        <div className="childContainer">
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Navigate to="/main/new" />}></Route>
                <Route exact path="/main" element={<Navigate to="/main/new" />}></Route>
                <Route path="/main/:query" element={<Main />} ></Route>
            </Routes>
        </div>
      </NavState>
      </Router>
    </div>
  );
};

export default App;
