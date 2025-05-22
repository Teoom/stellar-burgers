import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const getAuthData = (state: RootState) => state.user;

export const getUser = createSelector(getAuthData, (state) => state.user);
export const getAuthChecked = createSelector(
  getAuthData,
  (state) => state.isAuthChecked
);
export const getAuthError = createSelector(getAuthData, (state) => state.error);

export const getIsUserAuth = createSelector(getAuthData, (state) =>
  Boolean(state.user)
);
