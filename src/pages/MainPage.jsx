import React, { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';
import styles from './mainPage.module.css'; // Importujemy style dla głównej strony
import FilterSidebar from '../components/FilterSidebar'; // Importujemy nowy komponent

const API_BASE_URL = "https://animoodbackend-production.up.railway.app/api/anime";

function MainPage({headerHeightRef}) {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mainPageRef = React.useRef(null);


  // Funkcja do pobierania danych o anime z API
  const fetchAnimes = async (url = API_BASE_URL) => { 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        console.log('Response OK');
      }
      const data = await response.json();
      setAnimes(data);
    } catch (error) {
      console.error('Error fetching anime data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Jednokrotne pobranie danych o anime przy pierwszym renderowaniu komponentu
  useEffect(() => {
    fetchAnimes();
  } , []);

  // Funkcja do usuwania anime
  const handleDeleteAnime = async (idAnime) => {
    if(window.confirm("Czy na pewno chcesz usunąć to anime?")) {
      try{
        const response = await fetch(`${API_BASE_URL}/${idAnime}`, {
          method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setAnimes(animes.filter(anime => anime.id !== idAnime));
      } catch (error) {
        console.error('Error deleting anime:', error);
        setError(error.message);
      }
    }
  }


  // Funkcja renderująca zawartość strony
  const renderContent = () => {
    if (loading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
      return <div className={styles.error}>Error: {error}</div>;
    }

    if (animes.length === 0) {
      return <div className={styles.noData}>No anime data available.</div>;
    }

    return animes.map((anime) => (
      <AnimeCard key={anime.id} anime={anime} onDelete={handleDeleteAnime} />
    ));
  }
  
  const handleFilterApply = (filterRes) => {
    const params = new URLSearchParams();
    if (filterRes.searchQuery) {
      params.append('title', filterRes.searchQuery);
    }
    if (filterRes.selectedGenres.length > 0) {
      params.append('genres', filterRes.selectedGenres.join(','));
    }
    if (filterRes.sortOption && filterRes.sortOption !== 'id') {
      const [sortField, sortDir] = filterRes.sortOption.split(',');
      params.append('sortBy', sortField);
      params.append('sortDir', sortDir || 'asc');
    }
    
    const filterUrl = `${API_BASE_URL}?${params.toString()}`;
    fetchAnimes(filterUrl);
  }

  useEffect(() => {
    // get height of window elements
    const windowHeight = window.innerHeight;
    const headerHeight = headerHeightRef + 3;
    const mainPageHeight = mainPageRef.current ? mainPageRef.current.offsetHeight : 0;
    const mainPagePadding = parseFloat(getComputedStyle(mainPageRef.current).paddingTop) + parseFloat(getComputedStyle(mainPageRef.current).paddingBottom);

    // Log the heights for debugging
    if (mainPageRef.current) {
      console.log('Main page height:', mainPageHeight);
      console.log('Main page padding:', mainPagePadding);
      console.log('Header height:', headerHeight);
      console.log('Window height:', windowHeight);

    
      if(windowHeight - headerHeight < mainPageHeight) {
        console.info('Main page height exceeds window height');
        mainPageRef.current.style.height = `${windowHeight - headerHeight - mainPagePadding*2}px`;
      }
    }
  });

  return (
    <main className={styles.mainPage}>

      <section className={styles.filterContainer}>
        <FilterSidebar onFilterApply={handleFilterApply} />
      </section>

      <section className={styles.mainPageContainer} ref={mainPageRef}>
        {renderContent()}
      </section>
    
    </main>
  );
}

export default MainPage;