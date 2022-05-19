import { Button } from "@material-ui/core";
import { CartItemType } from "../../Types";
import { Wrapper } from "./Cart.styles";

export type CartItemProps = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const { item, addToCart, removeFromCart } = props;

  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div className="cart-container">
        <h3>{item.title}</h3>
        <div className="information">
          <p>${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
