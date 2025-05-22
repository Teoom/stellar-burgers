import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const getConstructorData = (state: RootState) => state.burgerConstructor;

export const getBurgerConstructorItems = createSelector(
  getConstructorData,
  (state) => ({ bun: state.bun, ingredients: state.ingredients })
);
