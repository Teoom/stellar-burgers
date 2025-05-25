import { getOrderRequestStatus, getUserOrders } from '@selectors';
import { orderThunk } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserOrders) || [];
  const isLoading = useSelector(getOrderRequestStatus);

  useEffect(() => {
    dispatch(orderThunk.getOrders());
  }, []);

  return (
    <>
      <ProfileOrdersUI orders={orders} isOrdersLoading={isLoading} />
      <Outlet />
    </>
  );
};
