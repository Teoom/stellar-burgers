import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ingredientsThunk = {
  getIngredients: createAsyncThunk('ingredients/getIngredients', async () =>
    getIngredientsApi()
  )
};
