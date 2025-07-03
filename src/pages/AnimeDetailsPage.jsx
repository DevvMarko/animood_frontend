import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './animeDetailsPage.module.css';

const API_BASE_URL = 'https://animood-backend-386085181227.europe-central2.run.app/api/anime';

function AnimeDetailsPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAnimeDetails();
  }, [id]);

  return (
    <main className={styles.animeDetailsMain}>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {anime && (
        <article className={styles.animeDetailsContainer}>
          <img src={anime.imageUrl} alt={anime.title} className={styles.animeImage} />
          <section className={styles.title_and_genres}>
            <h1 className={styles.title}>{anime.title}</h1>
            <p className={styles.genres}>{anime.genres.map(genre => {
              return (
                <span key={genre} className={styles.genre}>
                  {genre}
                </span>
              );
            })}</p>
          </section>
          <section className={styles.descriptionSection}>
            <h2 className={styles.descriptionTitle}>Opis</h2>
            <p className={styles.description}>{anime.description}</p>
          </section>
          
          
        </article>
      )}

      {console.log(anime)}
    </main>
  );
}

export default AnimeDetailsPage;