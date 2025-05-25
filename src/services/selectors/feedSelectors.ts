import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const getFeedData = (state: RootState) => state.feed;

export const getOrders = createSelector(getFeedData, (state) => state.orders);

export const getTotalOrders = createSelector(
  getFeedData,
  (state) => state.total
);

export const getTotalTodayOrders = createSelector(
  getFeedData,
  (state) => state.totalToday
);

export const getFeedOrdersLoading = createSelector(
  getFeedData,
  (state) => state.isLoading
);

export const getOrderByNumber = createSelector(
  [getFeedData, (_, number: number) => number],
  ({ orders }, number) => orders.find((order) => order.number === number)
);

export const getUserOrderByLink = createSelector(
  getFeedData,
  (state) => state.linkOrder
);
