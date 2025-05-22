import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userThunk, TAuthState } from '../model';
import { TUser } from '@utils-types';

const initialState: TAuthState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUserData: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userThunk.register.pending, (state) => {
      state.user = null;
      state.isAuthChecked = false;
    });
    builder.addCase(userThunk.register.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthChecked = true;
    });
    builder.addCase(userThunk.register.rejected, (state, data) => {
      state.user = null;
      state.isAuthChecked = true;
      state.error = 'Пользователь уже зарегистрирован';
      console.log(data);
    });

    builder.addCase(userThunk.login.pending, (state) => {
      state.user = null;
      state.isAuthChecked = false;
    });
    builder.addCase(userThunk.login.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthChecked = true;
    });
    builder.addCase(userThunk.login.rejected, (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.error = 'Email или пароль не верный';
    });

    builder.addCase(userThunk.logout.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(userThunk.update.fulfilled, (state, data) => {
      state.user = data.payload.user;
    });
  }
});

export const userReducer = userSlice.reducer;
export const { setIsAuthChecked, setUserData, clearError } = userSlice.actions;
