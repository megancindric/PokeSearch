import React from "react";
import "./SearchBar.css";
const SearchBar = ({ searchTerm = "", setSearchTerm, handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="searchForm">
      <input
        className="border border-indigo-900 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search!</button>
    </form>
  );
};

export default SearchBar;
