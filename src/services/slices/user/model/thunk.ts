import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TRegisterData,
  setCookie,
  TLoginData,
  getCookie,
  deleteCookie,
  logoutApi,
  updateUserApi
} from '@api';
import { setIsAuthChecked, setUserData } from '../store';

export const userThunk = {
  register: createAsyncThunk(
    'user/userRegister',
    async (registerData: TRegisterData) => {
      const { refreshToken, accessToken, user } =
        await registerUserApi(registerData);
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return user;
    }
  ),
  login: createAsyncThunk('user/userLogin', async (loginData: TLoginData) => {
    const { refreshToken, accessToken, user } = await loginUserApi(loginData);
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }),
  checkUserAuth: createAsyncThunk(
    'user/checkUserAuth',
    async (_, { dispatch }) => {
      if (getCookie('accessToken')) {
        try {
          const { user } = await getUserApi();
          if (!user) throw new Error(`Ошибка в аутентификации пользователя`);
          dispatch(setUserData(user));
        } catch (err) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }

      dispatch(setIsAuthChecked(true));
    }
  ),
  logout: createAsyncThunk('user/userLogout', () => {
    logoutApi().then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }),
  update: createAsyncThunk(
    'user/updateUserApi',
    (updateData: Partial<TRegisterData>) => updateUserApi(updateData)
  )
};
