import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Detail, Pokemon } from "./Interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [pokeDetails, setPokeDetails] = useState<Detail>({
    id: 0,
    isOpen: false,
  });

  const loadMorePokemon = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
    });
    setLoading(false);
  };

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?_limit=20&offset=20"
      );

      setNextUrl(res.data.next);

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  return (
    <div className="container">
      <header className="pokemon-header">Pokemon</header>
      <PokemonCollection pokemons={pokemons} viewDetail={pokeDetails} setDetail={setPokeDetails} />
      <div className="btn">
        <button onClick={() => loadMorePokemon()}>
          {loading ? "Loading" : "Load more"}
        </button>
      </div>
    </div>
  );
};

export default App;
