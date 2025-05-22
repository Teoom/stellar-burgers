import { TOrder } from '@utils-types';

export type TOrderState = {
  orders: TOrder[] | null;
  orderRequest: boolean;
  lastOrder: TOrder | null;
};
