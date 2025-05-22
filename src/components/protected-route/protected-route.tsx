import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAuthChecked, getUser } from '@selectors';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || '/';
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
