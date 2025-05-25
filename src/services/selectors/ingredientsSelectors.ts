import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { TIngredient } from '@utils-types';

const getIngredientsData = (state: RootState) => state.ingredients;

export const getIngredientsLoading = createSelector(
  getIngredientsData,
  (state) => state.isIngredientsLoading
);

export const getIngredients = createSelector(
  getIngredientsData,
  (state) => state.ingredients
);

export const getIngredientsBuns = createSelector(
  getIngredientsData,
  (state) =>
    state.ingredients?.filter((ingredient) => ingredient.type === 'bun') || []
);

export const getIngredientsMains = createSelector(
  getIngredientsData,
  (state) =>
    state.ingredients?.filter((ingredient) => ingredient.type === 'main') || []
);

export const getIngredientsSauces = createSelector(
  getIngredientsData,
  (state) =>
    state.ingredients?.filter((ingredient) => ingredient.type === 'sauce') || []
);

export const getIngredientById = createSelector(
  [getIngredientsData, (_, id: string) => id],
  ({ ingredients }, id) =>
    ingredients?.find((ingredient) => ingredient._id === id)
);

export const getIngredientsByOrder = createSelector(
  [getIngredientsData, (_, orderIngredients: string[]) => orderIngredients],
  ({ ingredients }, orderIngredients) =>
    orderIngredients.reduce((acc, id) => {
      const findIngredient = ingredients?.find(
        (ingredient) => ingredient._id === id
      );

      if (findIngredient) {
        acc.push(findIngredient);
      }

      return acc;
    }, [] as TIngredient[])
);
