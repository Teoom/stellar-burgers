import { configureStore } from '@reduxjs/toolkit';
import { feedThunk } from '../model';
import { feedReducer, feedInitialState } from '../store';

import {
  getOrders,
  getTotalOrders,
  getTotalTodayOrders,
  getFeedOrdersLoading,
  getOrderByNumber,
  getUserOrderByLink
} from '@selectors';

import { TFeedState } from '../model';
import { RootState } from '@store';

describe('тест работы feedSlice', () => {
  const mockFeedState: TFeedState = {
    orders: [
      {
        _id: '68454088c2f30c001cb2ab47',
        ingredients: ['643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2025-06-08T07:49:28.352Z',
        updatedAt: '2025-06-08T07:49:29.062Z',
        number: 80512
      },
      {
        _id: '68453bebc2f30c001cb2ab3d',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный метеоритный бургер',
        createdAt: '2025-06-08T07:29:47.641Z',
        updatedAt: '2025-06-08T07:29:48.450Z',
        number: 80510
      }
    ],
    linkOrder: {
      _id: '68454088c2f30c001cb2ab47',
      ingredients: ['643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2025-06-08T07:49:28.352Z',
      updatedAt: '2025-06-08T07:49:29.062Z',
      number: 80512
    },
    total: 3,
    totalToday: 2,
    isLoading: false
  };

  describe('тест асинхронных экшенов', () => {
    describe('тест экшена getFeedOrders', () => {
      test('тест состояния pending', () => {
        const action = { type: feedThunk.getFeedOrders.pending.type };
        const state = feedReducer(feedInitialState, action);

        expect(state.isLoading).toBeTruthy();
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: feedThunk.getFeedOrders.fulfilled.type,
          payload: {
            orders: mockFeedState.orders,
            total: mockFeedState.total,
            totalToday: mockFeedState.totalToday
          }
        };
        const state = feedReducer(feedInitialState, action);

        expect(state.isLoading).toBeFalsy();
        expect(state.orders).toEqual(mockFeedState.orders);
        expect(state.total).toBe(mockFeedState.total);
        expect(state.totalToday).toBe(mockFeedState.totalToday);
      });
    });
    describe('тест экшена getOrderByNumber', () => {
      test('тест состояния fulfilled', () => {
        const linkOrder = {
          _id: '68454088c2f30c001cb2ab47',
          ingredients: ['643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный бургер',
          createdAt: '2025-06-08T07:49:28.352Z',
          updatedAt: '2025-06-08T07:49:29.062Z',
          number: 80512
        };
        const action = {
          type: feedThunk.getOrderByNumber.fulfilled.type,
          payload: {
            orders: [linkOrder]
          }
        };
        const state = feedReducer(feedInitialState, action);
        expect(state.linkOrder).toEqual(linkOrder);
      });
    });
  });

  describe('тест селекторов', () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      },
      preloadedState: {
        feed: mockFeedState
      }
    });

    const emptyStore = configureStore({
      reducer: {
        feed: feedReducer
      },
      preloadedState: {
        feed: feedInitialState
      }
    });

    test('тест селектора getOrders', () => {
      const expectedOrders = getOrders(store.getState() as RootState);
      expect(expectedOrders).toEqual(mockFeedState.orders);
    });
    test('тест селектора getTotalOrders', () => {
      const expectedNumber = getTotalOrders(store.getState() as RootState);
      expect(expectedNumber).toBe(3);

      const exptectedZero = getTotalOrders(emptyStore.getState() as RootState);
      expect(exptectedZero).toBe(0);
    });
    test('тест селектора getTotalTodayOrders', () => {
      const exptectedNumber = getTotalTodayOrders(
        store.getState() as RootState
      );
      expect(exptectedNumber).toBe(2);

      const exptectedZero = getTotalTodayOrders(
        emptyStore.getState() as RootState
      );
      expect(exptectedZero).toBe(0);
    });
    test('тест селектора getFeedOrdersLoading', () => {
      const expectedFalse = getFeedOrdersLoading(store.getState() as RootState);
      expect(expectedFalse).toBeFalsy();

      const expectedTrue = getFeedOrdersLoading(
        emptyStore.getState() as RootState
      );
      expect(expectedTrue).toBeTruthy();
    });
    test('тест селектора getOrderByNumber', () => {
      const expectedOrder = getOrderByNumber(
        store.getState() as RootState,
        80512
      );
      const order = mockFeedState.orders.find(
        (order) => order.number === 80512
      );
      expect(expectedOrder).toEqual(order);

      const expectedUndefined = getOrderByNumber(
        emptyStore.getState() as RootState,
        80512
      );
      expect(expectedUndefined).toBeUndefined();
    });
    test('тест селектора getUserOrderByLink', () => {
      const expectedOrderByLink = getUserOrderByLink(
        store.getState() as RootState
      );
      expect(expectedOrderByLink).toEqual(mockFeedState.linkOrder);

      const exptectedNull = getUserOrderByLink(
        emptyStore.getState() as RootState
      );
      expect(exptectedNull).toBeNull();
    });
  });
});
