import { Detail, PokemonDetails } from "../Interface";
import PokemonList from "./PokemonList";

interface Props {
  pokemons: PokemonDetails[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;

  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpen) {
      setDetail({
        id: id,
        isOpen: true,
      });
    }
  };

  return (
    <section
      className={
        viewDetail.isOpen
          ? "collection-container-active"
          : "collection-container"
      }
    >
      {viewDetail.isOpen ? <div className="overlay"></div> : <div></div>}
      {pokemons.map((pokemon) => (
        <div onClick={() => selectPokemon(pokemon.id)}>
          <PokemonList
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            abilities={pokemon.abilities}
            viewDetail={viewDetail}
            setDetail={setDetail}
          />
        </div>
      ))}
    </section>
  );
};

export default PokemonCollection;
