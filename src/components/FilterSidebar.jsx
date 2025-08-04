import React, { useState } from 'react';
import styles from './filterSidebarStyles/filterSidebar.module.css';

const ALL_GENRES = [
  { value: "action", label: "Akcja" },
  { value: "adventure", label: "Przygoda" },
  { value: "comedy", label: "Komedia" },
  { value: "drama", label: "Dramat" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "romance", label: "Romans" },
  { value: "shonen", label: "Shonen" },
  { value: "seinen", label: "Seinen" },
  { value: "slice-of-life", label: "Okruchy życia" },
  { value: "psychological", label: "Psychologiczny" },
  { value: "thriller", label: "Thriller" },
  { value: "mystery", label: "Tajemnica" },
  { value: "supernatural", label: "Nadprzyrodzony" },
  { value: "horror", label: "Horror" },
  { value: "sports", label: "Sportowy" },
  { value: "mecha", label: "Mecha" },
  { value: "isekai", label: "Isekai" },
  { value: "post-apocalyptic", label: "Postapokaliptyczny" },
  { value: "magical-girl", label: "Magical Girl" }
];

function FilterSidebar({ onFilterApply }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");

  const handleGenreChange = (event) => {
    const genreValue = event.target.value;
    setSelectedGenres(prev => 
      prev.includes(genreValue)
        ? prev.filter(g => g !== genreValue)
        : [...prev, genreValue]
    );
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterApply({
      searchQuery,
      selectedGenres,
      sortOption
    });
    console.log("Filter applied with:", {
      searchQuery,
      selectedGenres,
      sortOption
    });
  }

  return (
    <aside className={styles.sidebarContainer}>
      <form className={styles.sidebar} onSubmit={handleSubmit}>
        <h2>Filtry</h2>
        <hr />
        <h3>Tytuł</h3>
        <input 
          type="text" 
          name="searchBar" 
          placeholder='Wyszukaj po nazwie' 
          onChange={(e) => {setSearchQuery(e.target.value)}}
          className={styles.searchBar}
          />

        <h3>Sortowanie</h3>
        <select name="sortBy" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="id">Domyślnie</option>
          <option value="title,asc">Nazwa A-Z</option>
          <option value="title,desc">Nazwa Z-A</option>
        </select>

        <h3>Gatunki</h3>
        <div className={styles.genresContainer}>
          {ALL_GENRES.map((genre) => (
            <label key={genre.value} className={`${styles.genreLabel} ${selectedGenres.includes(genre.value) ? styles.selectedLabel : ''}`}>
              <input
                type="checkbox"
                value={genre.value}
                checked={selectedGenres.includes(genre.value)}
                onChange={handleGenreChange}
              />
              {genre.label}
            </label>
          ))}
        </div>

        <button type="submit" className={styles.applyButton}>Filtruj</button>
      </form>
    </aside>
  );
}

export default FilterSidebar;