import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: any[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state: CartState, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    addCartItem: (state: CartState, action: PayloadAction<any>) => {
      state.items = [...state.items, action.payload];
    },
    removeCartItem: (state: CartState, action: PayloadAction<any>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartItems, addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
