import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBun = Partial<TIngredient> & {
  type: 'bun';
  price: number;
  _id: string;
};
export type TBurgerContstructorState = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};
