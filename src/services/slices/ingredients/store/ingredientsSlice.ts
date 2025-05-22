import { createSlice } from '@reduxjs/toolkit';
import { ingredientsThunk, TIngredientState } from '../model';

const initialState: TIngredientState = {
  isIngredientsLoading: true,
  ingredients: null
};

const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredients = null;
      })
      .addCase(
        ingredientsThunk.getIngredients.fulfilled,
        (state, { payload }) => {
          state.isIngredientsLoading = false;
          state.ingredients = payload;
        }
      )
      .addCase(ingredientsThunk.getIngredients.rejected, (state) => {
        state.isIngredientsLoading = true;
        state.ingredients = null;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
