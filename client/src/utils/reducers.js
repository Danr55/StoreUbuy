import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialShopState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};

// Create the shopSlice
const shopSlice = createSlice({
  name: 'shop',
  initialState: initialShopState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload);
    },
    addMultipleToCart: (state, action) => {
      state.cart.push(...action.payload);
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find(product => product._id === action.payload._id);
      if (item) {
        item.purchaseQuantity = action.payload.purchaseQuantity;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product._id !== action.payload);
      state.cartOpen = state.cart.length > 0;
    },
    clearCart: (state) => {
      state.cartOpen = false;
      state.cart = [];
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  updateProducts,
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
  updateCategories,
  updateCurrentCategory,
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;

// import {
//   UPDATE_PRODUCTS,
//   ADD_TO_CART,
//   UPDATE_CART_QUANTITY,
//   REMOVE_FROM_CART,
//   ADD_MULTIPLE_TO_CART,
//   UPDATE_CATEGORIES,
//   UPDATE_CURRENT_CATEGORY,
//   CLEAR_CART,
//   TOGGLE_CART,
// } from './actions';

// // TODO: To get a better understand of how a reducer works - add comments to the various actions in the reducer
// // Your comments here
// // The initial state of the application. The products array is empty, the cart is empty, the cartOpen is false, the categories array is empty, and the currentCategory is null.
// export const reducer = (state, action) => {
//   switch (action.type) {
//     // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
//     // Your comment here
//     // The UPDATE_PRODUCTS case is used to update the products array in the global state. The action.products array is spread into the new products array.
//     case UPDATE_PRODUCTS:
//       return {
//         ...state,
//         products: [...action.products],
//       };

//     case ADD_TO_CART:
//       return {
//         ...state,
//         cartOpen: true,
//         cart: [...state.cart, action.product],
//       };

//     case ADD_MULTIPLE_TO_CART:
//       return {
//         ...state,
//         cart: [...state.cart, ...action.products],
//       };
//     // TODO: Add a comment describing the functionality of the UPDATE_CART_QUANTITY case
//     // Your comment here
//     // The UPDATE_CART_QUANTITY case is used to update the quantity of a product in the cart. The purchaseQuantity of the product is updated to the value of action.purchaseQuantity.
//     case UPDATE_CART_QUANTITY:
//       return {
//         ...state,
//         cartOpen: true,
//         cart: state.cart.map((product) => {
//           if (action._id === product._id) {
//             product.purchaseQuantity = action.purchaseQuantity;
//           }
//           return product;
//         }),
//       };

//     // TODO: Add a comment describing the functionality of the REMOVE_FROM_CART case
//     // Your comment here
//     // The REMOVE_FROM_CART case is used to remove a product from the cart. The product is removed from the cart array by filtering out the product with the matching _id.
//     case REMOVE_FROM_CART:
//       let newState = state.cart.filter((product) => {
//         return product._id !== action._id;
//       });

//       return {
//         ...state,
//         cartOpen: newState.length > 0,
//         cart: newState,
//       };

//     case CLEAR_CART:
//       return {
//         ...state,
//         cartOpen: false,
//         cart: [],
//       };

//     case TOGGLE_CART:
//       return {
//         ...state,
//         cartOpen: !state.cartOpen,
//       };

//     case UPDATE_CATEGORIES:
//       return {
//         ...state,
//         categories: [...action.categories],
//       };

//     case UPDATE_CURRENT_CATEGORY:
//       return {
//         ...state,
//         currentCategory: action.currentCategory,
//       };

//     // TODO: Add a comment describing what the default case is for
//     // Your comment here
//     // The default case is used to return the current state if the action type does not match any of the cases.
//     default:
//       return state;
//   }
// };
