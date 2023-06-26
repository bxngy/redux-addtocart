import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";

export const todoSlice = createSlice({
  name: "product",
  initialState: {
    products: [
      { id: v1(), name: "mobile", price: 22000, qty: 5 },
      { id: v1(), name: "teblet", price: 11900, qty: 9 },
      { id: v1(), name: "headphone", price: 2000, qty: 3 },
    ],
    cart: [],
    inputTaskValue: "",
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: v1(),
        name: action.payload.name,
        price: action.payload.price,
        qty: action.payload.qty,
      };
      if (
        action.payload.name != "" ||
        action.payload.price != "" ||
        action.payload.qty != ""
      ) {
        state.products.push(newTask);
      }
      state.inputTaskValue = "";
    },
    clearAll: (state, action) => {
      state.cart = [];
    },

    addToCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      const objIndexProduct = state.products.findIndex(
        (obj) => obj.id == action.payload.id
      );
      console.log("objIndex", objIndex);
      console.log("objIndexProduct", objIndexProduct);
      if (objIndex != -1) {
        state.cart[objIndex].qty = state.cart[objIndex].qty + 1;
        state.products[objIndexProduct].qty =
          state.products[objIndexProduct].qty - 1;
      } else {
        const newTask = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          qty: 1,
        };

        state.products[action.payload.index].qty =
          state.products[action.payload.index].qty - 1;
        state.cart.push(newTask);
      }
    },

    updateValue: (state, action) => {
      state.inputTaskValue = action.payload;
    },
  },
});

export const { addTask, addToCart, updateValue, editAddTask, clearAll } =
  todoSlice.actions;

export default todoSlice.reducer;
