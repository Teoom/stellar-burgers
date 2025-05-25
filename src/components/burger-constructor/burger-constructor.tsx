import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  getBurgerConstructorItems,
  getIsUserAuth,
  getLastOrder,
  getOrderRequestStatus
} from '@selectors';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@store';
import { clearLastOrder, orderThunk } from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurgerConstructorItems);
  const isUserAuth = useSelector(getIsUserAuth);

  const orderRequest = useSelector(getOrderRequestStatus);

  const orderModalData = useSelector(getLastOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    const data = [constructorItems.bun._id, ...ingredientsIds];
    dispatch(orderThunk.createOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(clearLastOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isUserAuth={isUserAuth}
    />
  );
};
