// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";

const Root = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // 🔥 Logout karne ke liye token remove
        navigate("/login"); // 🔥 Login page pe redirect
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<App onLogout={handleLogout} isLoggedIn={isLoggedIn} />} />
        </Routes>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>
);
