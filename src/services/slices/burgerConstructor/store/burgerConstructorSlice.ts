import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { TBun, TBurgerContstructorState } from '../model';
import { TIngredient } from '@utils-types';
import { orderThunk } from '../../orders';

const initialState: TBurgerContstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    selectBun: (state, { payload }: PayloadAction<TBun>) => {
      state.bun = payload;
    },
    addBurgerIngredient: (state, { payload }: PayloadAction<TIngredient>) => {
      state.ingredients.push({ ...payload, id: nanoid() });
    },
    deleteBurgerIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== payload
      );
    },
    moveUpBurgerIngredient: (
      state,
      { payload: index }: PayloadAction<number>
    ) => {
      [state.ingredients[index], state.ingredients[index - 1]] = [
        state.ingredients[index - 1],
        state.ingredients[index]
      ];
    },
    moveDownBurgerIngredient: (
      state,
      { payload: index }: PayloadAction<number>
    ) => {
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderThunk.createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const {
  selectBun,
  addBurgerIngredient,
  deleteBurgerIngredient,
  moveUpBurgerIngredient,
  moveDownBurgerIngredient
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
