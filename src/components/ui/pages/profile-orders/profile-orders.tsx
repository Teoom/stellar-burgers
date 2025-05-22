import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { Preloader } from '../../preloader';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  isOrdersLoading
}) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>

    <div className={`mt-10 ${styles.orders}`}>
      {isOrdersLoading ? (
        <Preloader />
      ) : orders.length ? (
        <OrdersList orders={orders} />
      ) : (
        <span className={`text text_type_main-default ${styles.center}`}>
          Вы не совершили ещё ни один заказ
        </span>
      )}
    </div>
  </main>
);
