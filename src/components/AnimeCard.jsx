import React from 'react';
import styles from './animeCard.module.css';
import { Link } from 'react-router-dom';

function AnimeCard({anime, onDelete}) {
  const [cardExpanded, setCardExpanded] = React.useState(false);

  return(
    <article className={`${styles.animeCardContainer}`} 
    onClick={() => setCardExpanded(!cardExpanded)}
    >

      <div className={`${styles.animeCardContent} ${cardExpanded ? styles.contentExpanded : ''}`}
      style={{ backgroundImage: `linear-gradient(180deg,rgba(231, 112, 35, 0) 0%, rgba(38, 55, 67, 1) 100%), url(${anime.imageUrl})` }}>
        <h2 className={styles.title}>{anime.title}</h2>

        <div  className={cardExpanded ? styles.cardDetailsOn : styles.cardDetailsOff}>
          <Link to={`/anime/${anime.id}`} className={`${styles.buttonDetails} ${styles.buttonLink}`}>Szczegóły</Link>
          <Link to={`/edit/${anime.id}`} className={`${styles.buttonEdit} ${styles.buttonLink}`}>Edytuj</Link>
          <button className={styles.buttonDelete}
          onClick={(e) => {
            e.stopPropagation(); // Zapobiega propagacji zdarzenia kliknięcia do rodz
            onDelete(anime.id);
          }}>
            Usuń
            </button>
        </div>
      </div>
      
    </article>
  );

}

export default AnimeCard;