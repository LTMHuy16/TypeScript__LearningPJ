import { useState } from "react";
import { useQuery } from "react-query";

// Components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

// Styles
import { StyledButton, Wrapper } from "./App.styles";
import { CartItemType } from "./Types";
import { getProduct } from "./fetchApi";
import CardItem from "./components/Items/CardItem";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce(
      (totalPrice: number, item) => totalPrice + item.amount,
      0
    );
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((preItems) => {
      const isItemInCart = preItems.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return preItems.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...preItems, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.reduce((totalItems, item) => {
        if (item.id === id) {
          if (item.amount === 1) return totalItems;
          return [...totalItems, { ...item, amount: item.amount - 1 }];
        } else {
          return [...totalItems, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <h2>Somethings went wrong ... </h2>;
  }

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge
          overlap="rectangular"
          badgeContent={getTotalItems(cartItems)}
          color="error"
        >
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <CardItem item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
