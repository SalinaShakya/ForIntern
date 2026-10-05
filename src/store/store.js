import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
//redux toolkit combines both store
//registers cartSlice under state.cart
//cartReducer knows like add items to the cart, remove,change quantity, clear
//logic to manage the cart

//store is where the state lives
//creating a global redux store
export const store = configureStore({ //configureStore actual redux store
  reducer: { //logic for changing that state
    cart: cartReducer, //use cartReducer to manage the state under the cart key
  },
});

//so this piece of code simply creates a global redux store 
// that has a cartReducer that simply controls the cart and
//  reducer is the one that simply changes the state and all of that is stored in the const store