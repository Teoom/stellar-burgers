import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  linkOrder: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
};
