import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { userThunk } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userThunk.logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
