import { FC, memo } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = memo(({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
              [styles.icon_inactive]: !isActive,
              [styles.icon]: isActive
            })
          }
        >
          <BurgerIcon type={'primary'} className={clsx(styles.fill)} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
              [styles.icon_inactive]: !isActive,
              [styles.icon]: isActive
            })
          }
        >
          <ListIcon type={'primary'} className={styles.fill} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <NavLink to='/'>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </NavLink>
      <div className={styles.link_position_last}>
        <NavLink
          to='profile'
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
              [styles.icon_inactive]: !isActive,
              [styles.icon]: isActive
            })
          }
        >
          <ProfileIcon type={'primary'} className={styles.fill} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
));
