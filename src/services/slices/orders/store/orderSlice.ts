import { createSlice } from '@reduxjs/toolkit';
import { orderThunk, TOrderState } from '../model';

const initialState: TOrderState = {
  orders: [],
  lastOrder: null,
  orderRequest: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearLastOrder: (state) => {
      state.lastOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderThunk.getOrders.pending, (state) => {
      state.orders = null;
      state.orderRequest = true;
    });
    builder.addCase(orderThunk.getOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
      state.orderRequest = false;
    });
    builder.addCase(orderThunk.getOrders.rejected, (state) => {
      state.orders = null;
      state.orderRequest = false;
    });

    builder.addCase(orderThunk.createOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(orderThunk.createOrder.fulfilled, (state, { payload }) => {
      state.orders?.push(payload.order);
      state.lastOrder = payload.order;
      state.orderRequest = false;
    });
    builder.addCase(orderThunk.createOrder.rejected, (state) => {
      state.orderRequest = false;
    });
  }
});

export const { clearLastOrder } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
export const ordersInitialState = initialState;
