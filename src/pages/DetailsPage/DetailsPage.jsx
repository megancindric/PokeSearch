import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const DetailsPage = () => {
  const { pokeName } = useParams();
  const [pokeDetails, setPokeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);
  const fetchPokemonDetails = async () => {
    try {
      //Make axios request
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      setPokeDetails(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchPokemonDetails:", error);
    }
  };

  return (
    <div className="container">
      <h1>{pokeName}'s Details!</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img
            src={pokeDetails.sprites.other["official-artwork"].front_default}
          />
          {/* <img
            src={pokeDetails.sprites.other["official-artwork"].front_shiny}
          /> */}
          <h3>Height: {pokeDetails.height}</h3>
          <h3>Weight: {pokeDetails.weight}</h3>
          <h3>Type:</h3>
          <ul>
            {pokeDetails.types.map((type) => (
              <li key={type.slot}>{type.type.name}</li>
            ))}
          </ul>
          <h3>Abilities:</h3>
          <ul>
            {pokeDetails.abilities.map((ability) => (
              <li key={ability.slot}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
