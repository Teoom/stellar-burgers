import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, ingredientsInitialState } from '../store';
import { ingredientsThunk } from '../model';

import {
  getIngredientsLoading,
  getIngredients,
  getIngredientsBuns,
  getIngredientsMains,
  getIngredientsSauces,
  getIngredientById,
  getIngredientsByOrder
} from '@selectors';

import { TIngredient } from '@utils-types';
import { RootState } from '@store';

describe('тест работы ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    }
  ];

  describe('тест асинхронных экшенов', () => {
    describe('тест экшена getIngredients', () => {
      test('тест состояния pending', () => {
        const action = { type: ingredientsThunk.getIngredients.pending.type };
        const state = ingredientsReducer(ingredientsInitialState, action);

        expect(state.isIngredientsLoading).toBeTruthy();
        expect(state.ingredients).toBeNull();
      });
      test('тест состояния rejected', () => {
        const action = { type: ingredientsThunk.getIngredients.rejected.type };
        const state = ingredientsReducer(
          { ...ingredientsInitialState, isIngredientsLoading: false },
          action
        );

        expect(state.isIngredientsLoading).toBeTruthy();
        expect(state.ingredients).toBeNull();
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: ingredientsThunk.getIngredients.fulfilled.type,
          payload: mockIngredients
        };
        const state = ingredientsReducer(ingredientsInitialState, action);

        expect(state.ingredients).toEqual(mockIngredients);
        expect(state.isIngredientsLoading).toBeFalsy();
      });
    });
  });

  describe('тест работы селекторов', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      },
      preloadedState: {
        ingredients: {
          isIngredientsLoading: false,
          ingredients: mockIngredients
        }
      }
    });

    const emptyStore = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      },
      preloadedState: {
        ingredients: {
          ...ingredientsInitialState
        }
      }
    });

    test('тест селектора getIngredientsLoading', () => {
      const expectedFalse = getIngredientsLoading(
        store.getState() as RootState
      );
      expect(expectedFalse).toBeFalsy();

      const expectedTrue = getIngredientsLoading(
        emptyStore.getState() as RootState
      );
      expect(expectedTrue).toBeTruthy();
    });
    test('тест селектора getIngredients', () => {
      const expectedIngredients = getIngredients(store.getState() as RootState);
      expect(expectedIngredients).toEqual(mockIngredients);

      const expectedNull = getIngredients(emptyStore.getState() as RootState);
      expect(expectedNull).toBeNull();
    });
    test('тест селектора getIngredientsBuns', () => {
      const expectedBuns = getIngredientsBuns(store.getState() as RootState);
      const buns = mockIngredients.filter(
        (ingredient) => ingredient.type === 'bun'
      );
      expect(expectedBuns).toEqual(buns);

      const expectedEmptyBuns = getIngredientsBuns(
        emptyStore.getState() as RootState
      );
      expect(expectedEmptyBuns).toEqual([]);
    });
    test('тест селектора getIngredientsMains', () => {
      const expectedMains = getIngredientsMains(store.getState() as RootState);
      const mains = mockIngredients.filter(
        (ingredient) => ingredient.type === 'main'
      );
      expect(expectedMains).toEqual(mains);

      const expectedEmptyMains = getIngredientsMains(
        emptyStore.getState() as RootState
      );
      expect(expectedEmptyMains).toEqual([]);
    });
    test('тест селектора getIngredientsSauces', () => {
      const expectedSauces = getIngredientsSauces(
        store.getState() as RootState
      );
      const sauces = mockIngredients.filter(
        (ingredient) => ingredient.type === 'sauce'
      );
      expect(expectedSauces).toEqual(sauces);

      const expectedEmptySauces = getIngredientsSauces(
        emptyStore.getState() as RootState
      );
      expect(expectedEmptySauces).toEqual([]);
    });
    test('тест селектора getIngredientById', () => {
      const expectedIngredient = getIngredientById(
        store.getState() as RootState,
        '643d69a5c3f7b9001cfa093c'
      );
      const ingredientById = mockIngredients.find(
        (ingredient) => ingredient._id === '643d69a5c3f7b9001cfa093c'
      );
      expect(expectedIngredient).toEqual(ingredientById);

      const expectedUndefined = getIngredientById(
        store.getState() as RootState,
        '643d69a5c'
      );
      expect(expectedUndefined).toBeUndefined();
    });
    test('тест селектора getIngredientsByOrder', () => {
      const expectedIngredients = getIngredientsByOrder(
        store.getState() as RootState,
        [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0943'
        ]
      );
      expect(expectedIngredients).toEqual(mockIngredients);
    });
  });
});
