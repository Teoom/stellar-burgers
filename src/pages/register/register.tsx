import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { userThunk, clearError } from '@slices';
import { useDispatch, useSelector } from '@store';
import { getAuthError } from '@selectors';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(getAuthError);

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    []
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password.length < 6) return;
    dispatch(userThunk.register({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
