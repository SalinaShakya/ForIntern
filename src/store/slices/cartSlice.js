import { createSlice } from "@reduxjs/toolkit";

const initialState = { //starting state
  cartItems: [], //list of items added to cart (firstly  no items)
  isOpen: false, //visibility of cart is closed
};

export const cartSlice = createSlice({ //so created a slice called cart then the reducers are the rules for like making changes in the cart
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload; //product you sent to cart
      const existing = state.cartItems.find((i) => i.name === product.name); // check if its already there or not
      if (existing) {
        existing.qty += 1; //if yes then just +1 qty
      } else {
        state.cartItems.push({ ...product, qty: 1 }); //if no then add it with qty 1
      }
      state.isOpen = true;//opens cart ui anyway
    },
    removeFromCart: (state, action) => {
      const name = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.name !== name); //keep eberything but that specific item
    },
    changeQty: (state, action) => {
      const { name, delta } = action.payload;
      const item = state.cartItems.find((i) => i.name === name);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
          state.cartItems = state.cartItems.filter((i) => i.name !== name);
        }
      }
    },
    setCartOpen: (state, action) => { //open cart for sure when open is true
      state.isOpen = action.payload;
    },
    toggleCart: (state) => { //simply open or close the cart 
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.cartItems = []; //empty the cart 
    },
  },
});

export const { //simply making it available for other components to use 
  //so that my product page can dispatch(addToCart(product))
  addToCart,
  removeFromCart,
  changeQty,
  setCartOpen,
  toggleCart,
  clearCart,
} = cartSlice.actions;

/* ── Selectors ── */
//so selectors are the ones that can read the redux store  
export const selectCartItems = (state) => state.cart.cartItems; //to show the cart items
export const selectIsCartOpen = (state) => state.cart.isOpen; //to open the cart
export const selectCartTotal = (state) => //to get the total price
  state.cart.cartItems.reduce((sum, item) => {
    const numericPrice = (item.price || "0").toString().replace(/[^0-9]/g, "");
    const parsed = parseInt(numericPrice, 10);
    return sum + item.qty * (isNaN(parsed) ? 0 : parsed);
  }, 0);
export const selectCartCount = (state) => //number of items in the cart
  state.cart.cartItems.reduce((count, item) => count + item.qty, 0);

export default cartSlice.reducer;
