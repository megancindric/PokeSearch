import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import ResultsList from "../../components/ResultsList/ResultsList";
import "./SearchPage.css";
import axios from "axios";

const SearchPage = ({ Dex }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchPokemon = async () => {
    try {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      let response = await axios.get(
        `https://pokeapi.co/api/v2/type/${lowerCaseSearchTerm}`
      );
      setSearchResults(response.data.pokemon);
    } catch (error) {
      console.log("Error in searchPokemon request", error);
    }
  };

  const getAllPokemon = async () => {
    try {
      let response = await Dex.getPokemonSpeciesList();
      setSearchResults(response.results);
    } catch (error) {
      console.log("Error in getAllPokemon Request: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon();
  };
  useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  return (
    <div className="container search font-bold">
      <h1 className=" text-5xl">Search the Dex</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />
      <ResultsList searchResults={searchResults} searchTerm={searchTerm} />
    </div>
  );
};

export default SearchPage;
