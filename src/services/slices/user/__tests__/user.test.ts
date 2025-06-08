import { configureStore } from '@reduxjs/toolkit';

import { userThunk } from '../model';
import {
  userReducer,
  userInitialState,
  setIsAuthChecked,
  setUserData,
  clearError
} from '../store';

import {
  getUser,
  getAuthChecked,
  getAuthError,
  getIsUserAuth
} from '@selectors';

import { RootState } from '@store';
import { TUser } from '@utils-types';

describe('тест работы userSlice', () => {
  const mockUser: TUser = {
    email: 'testAccount777@yandex.ru',
    name: 'testAccount777'
  };
  describe('тест асинхронных экшенов', () => {
    describe('тест экшена register', () => {
      test('тест состояния pending', () => {
        const action = { type: userThunk.register.pending.type };
        const state = userReducer(userInitialState, action);

        expect(state.error).toBeNull();
        expect(state.isAuthChecked).toBeFalsy();
      });
      test('тест состояние reject', () => {
        const action = { type: userThunk.register.rejected.type };
        const state = userReducer(userInitialState, action);

        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBeTruthy();
        expect(state.error).toBe('Пользователь уже зарегистрирован');
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: userThunk.register.fulfilled.type,
          payload: mockUser
        };
        const state = userReducer(userInitialState, action);

        expect(state.user).toEqual(mockUser);
        expect(state.isAuthChecked).toBeTruthy();
      });
    });
    describe('тест экшена login', () => {
      test('тест состояния pending', () => {
        const action = { type: userThunk.login.pending.type };
        const state = userReducer(userInitialState, action);

        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBeFalsy();
      });
      test('тест состояния reject', () => {
        const action = { type: userThunk.login.rejected.type };
        const state = userReducer(userInitialState, action);

        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBeTruthy();
        expect(state.error).toBe('Email или пароль не верный');
      });
      test('тест состояния fulfilled', () => {
        const action = {
          type: userThunk.login.fulfilled.type,
          payload: mockUser
        };
        const state = userReducer(userInitialState, action);

        expect(state.user).toEqual(mockUser);
        expect(state.isAuthChecked).toBeTruthy();
      });
    });
    describe('тест экшена logout', () => {
      test('тест состояния fulfilled', () => {
        const action = { type: userThunk.logout.fulfilled.type };
        const state = userReducer(
          {
            user: mockUser,
            isAuthChecked: true,
            error: null
          },
          action
        );

        expect(state.user).toBeNull();
      });
    });
    describe('тест экшена update', () => {
      test('тест состояния fulfilled', () => {
        const action = {
          type: userThunk.update.fulfilled.type,
          payload: {
            user: {
              name: 'test555',
              email: 'test555@yandex.ru'
            }
          }
        };
        const state = userReducer(
          {
            user: mockUser,
            isAuthChecked: true,
            error: null
          },
          action
        );

        expect(state.user?.name).toBe('test555');
        expect(state.user?.email).toBe('test555@yandex.ru');
      });
    });
  });
  describe('тест синхронных  экшенов', () => {
    test('тест экшена setIsAuthChecked', () => {
      const actions = { type: setIsAuthChecked.type, payload: true };
      const state = userReducer(userInitialState, actions);

      expect(state.isAuthChecked).toBeTruthy();
    });
    test('тест экшена setUserData', () => {
      const actions = { type: setUserData.type, payload: mockUser };
      const state = userReducer(userInitialState, actions);

      expect(state.user).toEqual(mockUser);
    });
    test('тест экшена setUserData', () => {
      const actions = { type: clearError.type };
      const state = userReducer(
        { user: mockUser, isAuthChecked: true, error: 'Какая-то ошибка' },
        actions
      );

      expect(state.error).toBeNull();
    });
  });
  describe('тест работы селекторов', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      },
      preloadedState: {
        user: { user: mockUser, isAuthChecked: true, error: 'Ошибка' }
      }
    });

    test('тест селектора getUser', () => {
      const expectedUser = getUser(store.getState() as RootState);
      expect(expectedUser).toEqual(mockUser);
    });
    test('тест селектора getAuthChecked', () => {
      const expectedTrue = getAuthChecked(store.getState() as RootState);
      expect(expectedTrue).toBeTruthy();
    });
    test('тест селектора getAuthError', () => {
      const expectedErrorText = getAuthError(store.getState() as RootState);
      expect(expectedErrorText).toBe('Ошибка');
    });
    test('тест селектора getIsUserAuth', () => {
      const expectedTrue = getIsUserAuth(store.getState() as RootState);
      expect(expectedTrue).toBeTruthy();
    });
  });
});
