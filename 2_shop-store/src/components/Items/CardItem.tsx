import { Button } from "@material-ui/core";
import { CartItemType } from "../../Types";
import { Wrapper } from "./Items.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const CardItem: React.FC<Props> = (props) => {
  const { item, handleAddToCart } = props;

  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
  );
};

export default CardItem;
