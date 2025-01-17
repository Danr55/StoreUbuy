import { configureStore } from '@reduxjs/toolkit';
import { shopReducer } from './reducers'; // Your combined reducer

const store = configureStore({
  reducer: {
    shop: shopReducer, // This should match the structure you're trying to access in your component
  },
});

export default store;