// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../reducers/orderSlice';
import modalReducer from '../reducers/modalSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
