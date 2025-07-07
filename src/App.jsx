// src/App.jsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// components
import Header from './components/header.jsx';

// pages
import AddAnimePage from './pages/AddAnimePage';
import MainPage from './pages/MainPage';
import AnimeDetailsPage from './pages/AnimeDetailsPage.jsx';
import EditAnimePage from './pages/EditAnimePage.jsx';


function App() {
  const headereRef = useRef(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  React.useEffect(() => {
    // Ten kod zostanie uruchomiony po zamontowaniu komponentu
    if (headereRef.current) {
      setHeaderHeight(headereRef.current.offsetHeight);
    }
  }, []); // Pusta tablica zależności sprawia, że hook uruchomi się tylko raz po początkowym renderowaniu

  return (
    <Router>
      <Header ref={headereRef}/>
      <Routes>
        <Route path="/" element={<MainPage headerHeightRef={headerHeight}/>} />
        <Route path="/add" element={<AddAnimePage />} />
        <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        <Route path="/edit/:id" element={<EditAnimePage />} />

      </Routes>
    </Router>
  );
}

export default App;