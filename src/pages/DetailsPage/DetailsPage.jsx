import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-row">
            <img
              alt={`Front sprite of ${pokeName}`}
              className=" h-80"
              src={pokeDetails.sprites.other["official-artwork"].front_default}
            />
            <img
              alt={`Shiny front sprite of ${pokeName}`}
              className=" h-80"
              src={pokeDetails.sprites.other["official-artwork"].front_shiny}
            />
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col justify-center items-center">
              <h3 className=" text-3xl">Height:</h3>
              <p>{pokeDetails.height / 10} m</p>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <h3 className="text-3xl">Weight:</h3>
              <p>{pokeDetails.weight / 10} kg</p>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-3xl">Type:</h3>
              <ul className="flex flex-col">
                {pokeDetails.types.map((type) => (
                  <li key={type.slot}>{type.type.name}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-3xl">Abilities:</h3>
              <ul className="flex flex-col">
                {pokeDetails.abilities.map((ability) => (
                  <li key={ability.slot}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl">Moves:</h3>
            <ul className="flex flex-col flex-wrap ">
              {pokeDetails.moves.map((move, index) => (
                <li key={index} className="p-2">
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
