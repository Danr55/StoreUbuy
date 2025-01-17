import { configureStore } from '@reduxjs/toolkit';
import { shopReducer } from './reducers';  // Import the shopReducer

const store = configureStore({
  reducer: {
    shop: shopReducer,  // Make sure this matches the name you're using in your selector
  },
});

export default store;

// import { createContext, useContext, useReducer } from "react";
// import { reducer } from './reducers'

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: '',
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };
