import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<App />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="*"
        element={
          <NotFound />
        }
      />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
