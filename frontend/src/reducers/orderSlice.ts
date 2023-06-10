// src/reducers/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../interfaces/Order";

interface OrderState {
  orders: Order[];
  targetToken: string;
}

const initialState: OrderState = {
  orders: [],
  targetToken: "ETH",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order.tokenAddress !== action.payload
      );
    },
    modifyOrder: (
      state,
      action: PayloadAction<{ tokenAddress: string; amount: string }>
    ) => {
      const { tokenAddress, amount } = action.payload;
      const index = state.orders.findIndex(
        (order) => order.tokenAddress === tokenAddress
      );
      if (index !== -1) {
        state.orders[index].amount = amount;
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setTargetToken: (state, action: PayloadAction<string>) => {
      state.targetToken = action.payload;
    },
    setReceivedAmount: (
      state,
      action: PayloadAction<{ tokenAddress: string; receivedAmount: string }>
    ) => {
      const { tokenAddress, receivedAmount } = action.payload;
      const index = state.orders.findIndex(
        (order) => order.tokenAddress === tokenAddress
      );
      if (index !== -1) {
        state.orders[index].receivedAmount = receivedAmount;
      }
    },
  },
});

export const {
  addOrder,
  removeOrder,
  modifyOrder,
  clearOrders,
  setTargetToken,
  setReceivedAmount,
} = orderSlice.actions;
export default orderSlice.reducer;
