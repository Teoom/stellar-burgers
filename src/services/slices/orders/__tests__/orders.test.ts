import { configureStore } from '@reduxjs/toolkit';

import { orderThunk } from '../model';
import { ordersReducer, ordersInitialState, clearLastOrder } from '../store';

import {
  getUserOrders,
  getOrderRequestStatus,
  getLastOrder,
  getUserOrderByNumber
} from '@selectors';

import { TOrder } from '@utils-types';
import { RootState } from '@store';

describe('тест работы ordersSlice', () => {
  const mockOrder: TOrder = {
    _id: '6843de20c2f30c001cb2a8b4',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0945'
    ],
    status: 'done',
    name: 'Краторный био-марсианский антарианский бургер',
    createdAt: '2025-06-07T06:37:20.892Z',
    updatedAt: '2025-06-07T06:37:21.683Z',
    number: 80457
  };
  describe('тест асинхронных экшенов', () => {
    describe('тест экшена getOrders', () => {
      test('тест состояния pending', () => {
        const action = { type: orderThunk.getOrders.pending.type };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orders).toBeNull();
        expect(state.orderRequest).toBeTruthy();
      });
      test('тест состояния rejected', () => {
        const action = { type: orderThunk.getOrders.rejected.type };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orders).toBeNull();
        expect(state.orderRequest).toBeFalsy();
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: orderThunk.getOrders.fulfilled.type,
          payload: [mockOrder]
        };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orders).toEqual([mockOrder]);
        expect(state.orderRequest).toBeFalsy();
      });
    });
    describe('тест экшена createOrder', () => {
      test('тест состояния pending', () => {
        const action = { type: orderThunk.createOrder.pending.type };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orderRequest).toBeTruthy();
      });
      test('тест состояния rejected', () => {
        const action = { type: orderThunk.createOrder.rejected.type };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orderRequest).toBeFalsy();
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: orderThunk.createOrder.fulfilled.type,
          payload: {
            order: mockOrder
          }
        };
        const state = ordersReducer(ordersInitialState, action);

        expect(state.orderRequest).toBeFalsy();
        expect(state.orders).toEqual([mockOrder]);
        expect(state.lastOrder).toEqual(mockOrder);
      });
    });
  });
  describe('тест синхроных экшенов', () => {
    test('тест экшена clearLastOrder', () => {
      const store = configureStore({
        reducer: {
          orders: ordersReducer
        },
        preloadedState: {
          orders: {
            orderRequest: false,
            orders: [mockOrder],
            lastOrder: mockOrder
          }
        }
      });

      expect(store.getState().orders.lastOrder).toEqual(mockOrder);

      store.dispatch(clearLastOrder());
      expect(store.getState().orders.lastOrder).toBeNull();
    });
  });
  describe('тест работы селекторов', () => {
    const newMockOrder = { ...mockOrder, number: 99999 };

    const store = configureStore({
      reducer: {
        orders: ordersReducer
      },
      preloadedState: {
        orders: {
          orderRequest: true,
          orders: [mockOrder, newMockOrder],
          lastOrder: newMockOrder
        }
      }
    });
    test('тест селектора getUserOrders', () => {
      const expectedOrders = getUserOrders(store.getState() as RootState);
      expect(expectedOrders).toEqual([
        mockOrder,
        { ...mockOrder, number: 99999 }
      ]);
    });
    test('тест селектора getOrderRequestStatus', () => {
      const expectedTrue = getOrderRequestStatus(store.getState() as RootState);
      expect(expectedTrue).toBeTruthy();
    });
    test('тест селектора getLastOrder', () => {
      const expectedLastOrder = getLastOrder(store.getState() as RootState);
      expect(expectedLastOrder).toEqual(newMockOrder);
    });
    test('тест селектора getUserOrderByNumber', () => {
      const exptectedOrder80457 = getUserOrderByNumber(
        store.getState() as RootState,
        80457
      );
      const exptectedOrder99999 = getUserOrderByNumber(
        store.getState() as RootState,
        99999
      );

      expect(exptectedOrder80457).toEqual(mockOrder);
      expect(exptectedOrder99999).toEqual(newMockOrder);
    });
  });
});
