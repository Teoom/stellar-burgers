import { getFeedOrdersLoading, getOrders } from '@selectors';
import { feedThunk } from '@slices';
import { useDispatch } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  const isLoading = useSelector(getFeedOrdersLoading);

  useEffect(() => {
    dispatch(feedThunk.getFeedOrders());
  }, []);

  const handleGetFeeds = () => {
    dispatch(feedThunk.getFeedOrders());
  };

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      <Outlet />
    </>
  );
};
