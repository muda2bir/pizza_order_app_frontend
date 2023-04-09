import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartObj {
  pizza_name: string;
  selectedIngredients: string[];
}

export interface CartType {
  value: CartObj;
}

const initialState: CartType = {
  value: {
    pizza_name: "",
    selectedIngredients: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartObj>) => {
      state.value = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
