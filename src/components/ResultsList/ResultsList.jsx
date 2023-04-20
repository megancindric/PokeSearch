import React from "react";
import "./ResultsList.css";
import { Link } from "react-router-dom";
const ResultsList = ({ searchResults }) => {
  return (
    <div className="resultsList">
      <h2>Search Results:</h2>
      {searchResults.map((pokemon, index) => (
        <Link key={index} to={`/details/${pokemon.pokemon.name}`}>
          <div>
            <h3>{pokemon.pokemon.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ResultsList;
