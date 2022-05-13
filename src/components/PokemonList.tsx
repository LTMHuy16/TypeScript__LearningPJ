import { useEffect, useState } from "react";
import { Detail } from "../Interface";

interface Props {
  id: number;
  name: string;
  image: string;
  abilities:
    | {
        ability: string;
        name: string;
      }[]
    | undefined;
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setDetail } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const closeDetails = () => {
    setDetail({
      id: 0,
      isOpen: false,
    });
  };

  useEffect(() => {
    setIsSelected(id === viewDetail.id);
  }, [viewDetail]);

  return isSelected ? (
    <section className="pokemon-list-detailed">
      <div className="detail-container">
        <p className="detail-close" onClick={closeDetails}>
          X
        </p>
        <div className="detail-info">
          <img src={image} alt="" className="detail-img" />
          <p className="detail-name">{name}</p>
        </div>
        <div className="detail-skill">
          <p className="detail-ability">
            Abilities:{" "}
            {abilities?.map((ab: any) => (
              <div>{ab.ability.name}</div>
            ))}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <div className="pokemon-list-container">
      <h5 className="pokemon-name">{name}</h5>
      <img src={image} alt={name} />
    </div>
  );
};

export default PokemonList;
