//connecting redux store to the next.js application

"use client"; //needs to run on client/browser

import { Provider } from "react-redux"; //provider is the one that makes redux store available to the react components
import { store } from "./store"; //getting the store from the store.js
//now it has access to the redux store
export default function StoreProvider({ children }) { //simply creating a StoreProvider component
  //and wrapping all the children components with the provider
  //so that they can access the store
  //children is simply all the other components inside the StoreProvider
  return <Provider store={store}>{children}</Provider>; //now all the components can access the redux store
}
