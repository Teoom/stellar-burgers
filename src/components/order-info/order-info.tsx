import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import {
  getIngredients,
  getOrderByNumber,
  getUserOrderByNumber,
  getUserOrderByLink
} from '@selectors';
import { feedThunk } from '@slices';

export const OrderInfo: FC<{ orderOf: string }> = ({ orderOf }) => {
  const dispatch = useDispatch();
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();

  const orderData = useSelector((state) => {
    const order =
      orderOf === 'feed'
        ? getOrderByNumber(state, Number(number))
        : getUserOrderByNumber(state, Number(number));

    if (!order) return getUserOrderByLink(state);

    return order;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(feedThunk.getOrderByNumber(Number(number)));
    }
  }, []);

  const ingredients: TIngredient[] = useSelector(getIngredients)!;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
