import { createSlice } from '@reduxjs/toolkit';
import { feedThunk, TFeedState } from '../model';

const initialState: TFeedState = {
  orders: [],
  linkOrder: null,
  total: 0,
  totalToday: 0,
  isLoading: true
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedThunk.getFeedOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(feedThunk.getFeedOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    });

    builder.addCase(
      feedThunk.getOrderByNumber.fulfilled,
      (state, { payload }) => {
        state.linkOrder = payload.orders[0];
      }
    );
  }
});

export const feedReducer = feedSlice.reducer;
export const feedInitialState = initialState;
