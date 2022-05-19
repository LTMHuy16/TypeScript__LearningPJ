import { CartItemProps, CartItemType } from "../../Types";
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";

const Cart: React.FC<CartItemProps> = (props) => {
  const { cartItems, addToCart, removeFromCart } = props;

  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce(
      (totalPrice, item) => totalPrice + item.amount * item.price,
      0
    );
  };

  return (
    <Wrapper>
      <>
        <h2>Your shopping cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <div>Total: ${calculateTotal(cartItems).toFixed(2)}</div>
      </>
    </Wrapper>
  );
};

export default Cart;
