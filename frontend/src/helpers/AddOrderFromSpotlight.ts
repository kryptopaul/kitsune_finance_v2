// helpers/AddOrderFromSpotlight.ts
import { store } from '../store';
import { addOrder } from '../reducers/orderSlice';

export function addOrderFromSpotlight(address: string) {
  const order = {
    tokenAddress: address,
    amount: `0`,
    receivedAmount: `0`,
  };

  store.dispatch(addOrder(order));
}
