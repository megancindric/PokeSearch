import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import ResultsList from "../../components/ResultsList/ResultsList";
import "./SearchPage.css";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPokemon = async () => {
    try {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      let response = await axios.get(
        `https://pokeapi.co/api/v2/type/${lowerCaseSearchTerm}`
      );
      setSearchResults(response.data.pokemon);
    } catch (error) {
      console.log("Error in fetchPokemon request", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  return (
    <div className="container search">
      <h1>Search Page!</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />
      <ResultsList searchResults={searchResults} />
    </div>
  );
};

export default SearchPage;
