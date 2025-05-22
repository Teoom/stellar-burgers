import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const feedThunk = {
  getFeedOrders: createAsyncThunk('feed/getFeedOrders', () => getFeedsApi()),
  getOrderByNumber: createAsyncThunk(
    '/feed/getOrderByNumber',
    (number: number) => getOrderByNumberApi(number)
  )
};
