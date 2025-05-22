import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderThunk = {
  getOrders: createAsyncThunk('order/getOrders', () => getOrdersApi()),
  createOrder: createAsyncThunk('order/createOrder', (data: string[]) =>
    orderBurgerApi(data)
  )
};
