import { useEffect } from 'react';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';
import { useDispatch } from '@store';
import { ingredientsThunk, userThunk } from '@slices';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk.checkUserAuth());
    dispatch(ingredientsThunk.getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default App;
