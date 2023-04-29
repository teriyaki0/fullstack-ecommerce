import { ICartItem } from "./../types/cart.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./types";

const initialState: initialState = {
  items: [],
};

interface IAddToCartPayload extends Omit<ICartItem, "id"> {}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const id = state.items.length;
      const item = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (!item) {
        state.items.push({ ...action.payload, id: state.items.length });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearFromCart: (state) => {
      state.items = [];
    },
    incrementToCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    decrementToCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
    },
  },
});
