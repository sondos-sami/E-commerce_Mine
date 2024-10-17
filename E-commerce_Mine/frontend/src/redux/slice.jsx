import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
       const findProduct=state.find((product)=>product.id===action.payload.id);
       if(findProduct){
          findProduct.quantity+=1;
       }else{
      state.push({ ...action.payload, quantity: 1 });} 
    },
    clear: () => [],
    deleteFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

// Exporting actions
export const { addToCart, clear, deleteFromCart, incrementQuantity, decrementQuantity } = cart.actions;

// Exporting the reducer
export const cartSlice= cart.reducer;