import React from 'react';
import './SearchBar.css';
import { useState } from "react";

function SearchBar({setLocationHandler}) {
  const [query, setQuery] = useState('');

  function onFormSubmit(event) {
      event.preventDefault();
      setLocationHandler(query);
  }

  return (
    <form className="searchbar" onSubmit={onFormSubmit}>
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Zoek een stad in Nederland"
      />

      <button type="submit">
        Zoek
      </button>
    </form>
  );
}

export default SearchBar;
