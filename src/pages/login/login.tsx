import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { userThunk, clearError } from '@slices';
import { getAuthError } from '@selectors';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getAuthError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    []
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password.length < 6) return;
    dispatch(userThunk.login({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
