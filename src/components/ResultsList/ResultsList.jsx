import React from "react";
import "./ResultsList.css";
import { Link } from "react-router-dom";
const ResultsList = ({ searchResults, searchTerm }) => {
  let displayMons =
    searchResults.length > 0
      ? searchResults.filter((mon) => {
          return mon.name.includes(searchTerm);
        })
      : searchResults;
  return (
    <div className="resultsList">
      <h2 className="text-4xl">Search Results:</h2>
      <div className="flex flex-col gap-8 items-center">
        {displayMons.map((pokemon, index) => (
          <Link
            key={index}
            to={`/details/${pokemon.name}`}
            className="w-1/2 border p-4 rounded-lg bg-indigo-50 drop-shadow-md transition-all hover:scale-110"
          >
            <h3 className=" text-xl">{pokemon.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
