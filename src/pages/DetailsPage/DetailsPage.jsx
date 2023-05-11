import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const DetailsPage = ({ Dex }) => {
  const { pokeName } = useParams();
  const [pokeDetails, setPokeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchPokemonDetails();
  }, []);
  const fetchPokemonDetails = async () => {
    try {
      //Make axios request
      let response = await Dex.getPokemonByName(pokeName);
      setPokeDetails(response);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchPokemonDetails:", error);
    }
  };

  return (
    <div className=" font-bold flex flex-col justify-center items-center text-xl">
      <h1 className=" text-5xl">
        #{pokeDetails.id} {pokeName}
      </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="">
          <div className="flex flex-row">
            <img
              className=" h-80"
              src={pokeDetails.sprites.other["official-artwork"].front_default}
            />
            <img
              className=" h-80"
              src={pokeDetails.sprites.other["official-artwork"].front_shiny}
            />
          </div>
          {/* <img
            src={pokeDetails.sprites.other["official-artwork"].front_shiny}
          /> */}

          <h3>Height: {pokeDetails.height}</h3>
          <h3>Weight: {pokeDetails.weight}</h3>
          <h3 className="text-3xl">Type:</h3>
          <ul className="flex flex-col">
            {pokeDetails.types.map((type) => (
              <li key={type.slot}>{type.type.name}</li>
            ))}
          </ul>
          <h3 className="text-3xl">Abilities:</h3>
          <ul className="flex flex-col">
            {pokeDetails.abilities.map((ability) => (
              <li key={ability.slot}>{ability.ability.name}</li>
            ))}
          </ul>
          <h3 className="text-3xl">Moves:</h3>
          <ul className="flex flex-col">
            {pokeDetails.moves.map((move, index) => (
              <li key={index}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
