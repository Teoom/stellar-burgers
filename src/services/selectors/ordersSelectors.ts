import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const getOrdersData = (state: RootState) => state.orders;

export const getUserOrders = createSelector(
  getOrdersData,
  (state) => state.orders
);

export const getOrderRequestStatus = createSelector(
  getOrdersData,
  (state) => state.orderRequest
);

export const getLastOrder = createSelector(
  getOrdersData,
  (state) => state.lastOrder
);

export const getUserOrderByNumber = createSelector(
  [getOrdersData, (_, number: number) => number],
  (state, number) => state.orders?.find((order) => order.number === number)
);
