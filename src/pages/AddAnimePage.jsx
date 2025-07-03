import React from "react";
import styles from "./addAnimePage.module.css";


// Definicja dostępnych gatunków anime
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

// Komponent do wyświetlania checkboxów dla gatunków anime
function GenreCheckbox({availableGenres, selectedGenres, onChange}){
    return availableGenres.map((genre) => (
         <label key={genre.value} className={`${styles.genreLabel} ${selectedGenres.includes(genre.value) ? styles.selectedLabel : ""}`}>
            <input
                type="checkbox"
                value={genre.value}
                checked={selectedGenres.includes(genre.value)}
                onChange={onChange}
            />
            {genre.label}
         </label>
    ));
};

const api_url = "https://animood-backend-386085181227.europe-central2.run.app/api/anime";

// == Komponent AddAnimePage ===
function AddAnimePage() {

    const [selectedGenres, setSelectedGenres] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    // KROK 1: Dodajemy nowy stan do pokazywania komunikatu
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [error, setError] = React.useState(null); // Stan na ewentualne błędy

    const handleGenreChange = (event) => {
        const genreValue = event.target.value;
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genreValue)) {
                return prevGenres.filter((genre) => genre !== genreValue);
            } else {
                return [...prevGenres, genreValue];
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setShowSuccessMessage(false);
        setError(null);

        try {
            // sprawdzenie czy wszystkie pola są wypełnione
            if(!title || !description || !imageUrl || selectedGenres.length === 0) {
                setError("Wszystkie pola są wymagane.");
                return;
            }

            // przygotowanie danych do wysłania
            const animeData = {
                title,
                description,
                genres: selectedGenres,
                imageUrl
            };

            // wysylanie do api
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(animeData)
            })
            if (!response.ok) {
                throw new Error("Nie udało się dodać anime.");
            }
            const data = await response.json();
            console.log("Dodano anime:", data);

            // pokazanie komunikatu o sukcesie i czysczenie formularza
            setShowSuccessMessage(true);
            setTitle("");
            setDescription("");
            setImageUrl("");
            setSelectedGenres([]);
            
            // znikanie komunikatu po 3 sekundach
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }
        catch (err) {
            console.error("Błąd podczas dodawania anime:", err);
            setError("Wystąpił błąd podczas zapisywania anime. Spróbuj ponownie.");
            return;
        }
    }

    return(
        <section className={styles.sectionForm}>
            <form onSubmit={handleSubmit}>
                <h2>Tytuł</h2>
                <input className={styles.normalInput} type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
                <h2>Opis</h2>
                <textarea name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                <h2>Grafika</h2>
                <input className={styles.normalInput} type="text" name="image" onChange={(e) => setImageUrl(e.target.value)}/>
                <h2>Gatunek</h2>
                <section className={styles.genreContainer}>
                    <GenreCheckbox
                        availableGenres={ALL_GENRES}
                        selectedGenres={selectedGenres}
                        onChange={handleGenreChange}
                    />
                </section>
                <section className={styles.submitSection}>
                    <button type="submit">Zapisz</button>
                    

                    {showSuccessMessage && <p className={styles.successMessage}>Zapisano!</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </section>
                
            </form>
        </section>
    )
}
export default AddAnimePage;