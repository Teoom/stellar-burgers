import { TIngredient } from '@utils-types';

export type TIngredientState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[] | null;
};
