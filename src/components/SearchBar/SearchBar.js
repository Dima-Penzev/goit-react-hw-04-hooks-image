import { useState } from "react";
import s from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  const [imageSearch, setImageSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageSearch.trim() === "") {
      alert("Введите запрос в строку для поиска");
      return;
    }
    onSubmit(imageSearch);
    setImageSearch("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          value={imageSearch}
          onChange={(e) => {
            setImageSearch(e.currentTarget.value.toLowerCase());
          }}
        />
      </form>
    </header>
  );
}

export default SearchBar;
