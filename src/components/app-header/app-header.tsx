import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUser } from '@selectors';

export const AppHeader: FC = () => {
  const userData = useSelector(getUser);

  return <AppHeaderUI userName={userData?.name} />;
};
