import { configureStore } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

import {
  burgerConstructorReducer,
  burgerConstructorInitialState,
  selectBun,
  addBurgerIngredient,
  deleteBurgerIngredient,
  moveDownBurgerIngredient,
  moveUpBurgerIngredient
} from '../store';
import { orderThunk } from '../../orders';
import { getBurgerConstructorItems } from '@selectors';

import { TBun, TBurgerContstructorState } from '../model';
import { RootState } from '@store';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actual,
    nanoid: jest.fn()
  };
});
const mockedNanoid = nanoid as jest.MockedFunction<typeof nanoid>;

describe('тест работы burgerConstructorSlice', () => {
  const mockBurgerState: TBurgerContstructorState = {
    bun: {
      type: 'bun',
      price: 1255,
      _id: '643d69a5c3f7b9001cfa093c'
    },
    ingredients: [
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
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '100'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '200'
      }
    ]
  };
  describe('тест асинхронных экшенов', () => {
    describe('тест экшена createOrder', () => {
      test('тест состояния fulfilled', () => {
        const action = { type: orderThunk.createOrder.fulfilled.type };
        const state = burgerConstructorReducer(mockBurgerState, action);

        expect(state.bun).toBeNull();
        expect(state.ingredients).toEqual([]);
      });
    });
  });
  describe('тест синхроных экшенов', () => {
    const store = configureStore({
      reducer: {
        burgerConstructor: burgerConstructorReducer
      }
    });

    afterEach(() => {
      store.dispatch({ type: orderThunk.createOrder.fulfilled.type });
    });

    test('тест экшена selectBun', () => {
      expect(store.getState().burgerConstructor.bun).toBeNull();

      const bun: TBun = {
        type: 'bun',
        price: 1255,
        _id: '643d69a5c3f7b9001cfa093c'
      };

      store.dispatch(selectBun(bun));
      expect(store.getState().burgerConstructor.bun).toEqual(bun);
    });
    test('тест экшена addBurgerIngredient', () => {
      mockedNanoid.mockReturnValue('100');
      expect(store.getState().burgerConstructor.ingredients).toEqual([]);

      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[0]));
      const stateIngredients = store.getState().burgerConstructor.ingredients;

      expect(stateIngredients).toHaveLength(1);

      expect(stateIngredients).toEqual([mockBurgerState.ingredients[0]]);
    });
    test('тест экшена deleteBurgerIngredient', () => {
      mockedNanoid.mockReturnValueOnce('100').mockReturnValueOnce('200');

      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[0]));
      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[1]));

      let stateIngredients = store.getState().burgerConstructor.ingredients;

      expect(stateIngredients).toHaveLength(2);

      store.dispatch(deleteBurgerIngredient('100'));

      stateIngredients = store.getState().burgerConstructor.ingredients;
      expect(stateIngredients).toHaveLength(1);
      expect(stateIngredients).toEqual([mockBurgerState.ingredients[1]]);
    });
    test('тест экшена moveUpBurgerIngredient', () => {
      mockedNanoid.mockReturnValueOnce('100').mockReturnValue('200');
      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[0]));
      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[1]));

      let stateIngredients = store.getState().burgerConstructor.ingredients;
      expect(stateIngredients).toHaveLength(2);
      expect(stateIngredients).toEqual([
        mockBurgerState.ingredients[0],
        mockBurgerState.ingredients[1]
      ]);

      store.dispatch(moveUpBurgerIngredient(1));
      stateIngredients = store.getState().burgerConstructor.ingredients;
      expect(stateIngredients).toEqual([
        mockBurgerState.ingredients[1],
        mockBurgerState.ingredients[0]
      ]);
    });
    test('тест экшена moveDownBurgerIngredient', () => {
      mockedNanoid.mockReturnValueOnce('200').mockReturnValue('100');
      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[1]));
      store.dispatch(addBurgerIngredient(mockBurgerState.ingredients[0]));

      let stateIngredients = store.getState().burgerConstructor.ingredients;
      expect(stateIngredients).toHaveLength(2);
      expect(stateIngredients).toEqual([
        mockBurgerState.ingredients[1],
        mockBurgerState.ingredients[0]
      ]);

      store.dispatch(moveDownBurgerIngredient(0));
      stateIngredients = store.getState().burgerConstructor.ingredients;
      expect(stateIngredients).toEqual([
        mockBurgerState.ingredients[0],
        mockBurgerState.ingredients[1]
      ]);
    });
  });
  describe('тест селекторов', () => {
    const store = configureStore({
      reducer: {
        burgerConstructor: burgerConstructorReducer
      },
      preloadedState: {
        burgerConstructor: mockBurgerState
      }
    });
    test('тест селектора getBurgerConstructorItems', () => {
      const expectedBurgerData = getBurgerConstructorItems(
        store.getState() as RootState
      );
      expect(expectedBurgerData).toEqual(mockBurgerState);
    });
  });
});
