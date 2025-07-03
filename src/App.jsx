// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// components
import Header from './components/header.jsx';

// pages
import AddAnimePage from './pages/AddAnimePage';
import MainPage from './pages/MainPage';
import AnimeDetailsPage from './pages/AnimeDetailsPage.jsx';
import EditAnimePage from './pages/EditAnimePage.jsx';


function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<AddAnimePage />} />
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
          <Route path="/edit/:id" element={<EditAnimePage />} />
          {/* Możesz dodać więcej tras tutaj */}
        </Routes>
      </Router>
  );
}

export default App;