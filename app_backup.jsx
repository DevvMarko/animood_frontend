// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AddAnimePage from './Pages/AddAnimePage';


// Prosty komponent nagłówka na potrzeby nawigacji
function Header() {
  return (
    <header style={{ backgroundColor: '#282c34', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em' }}>
        ANIMOOD
      </Link>
      <Link to="/add" style={{ color: 'white', padding: '8px 15px', border: '1px solid white', borderRadius: '4px', textDecoration: 'none' }}>
        Dodaj anime
      </Link>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Dodajemy nasz nagłówek */}
        <main style={{ padding: '20px' }}> {/* Dodajemy trochę paddingu do głównej treści */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/add" element={<AddAnimePage />} />
            {/* Możesz tu dodać więcej ścieżek w przyszłości, np. dla strony szczegółów */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;