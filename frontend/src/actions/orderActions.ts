// src/actions/orderActions.ts
import { Order } from "../interfaces/Order";

export const ADD_ORDER = "ADD_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const MODIFY_ORDER = "MODIFY_ORDER";
export const CLEAR_ORDERS = "CLEAR_ORDERS";
export const SET_TARGET_TOKEN = "SET_TARGET_TOKEN";
export const SET_RECEIVED_AMOUNT = "SET_RECEIVED_AMOUNT";

interface AddOrderAction {
  type: typeof ADD_ORDER;
  payload: Order;
}

interface RemoveOrderAction {
  type: typeof REMOVE_ORDER;
  payload: string; // tokenAddress of the order to remove
}

interface ModifyOrderAction {
  type: typeof MODIFY_ORDER;
  payload: { tokenAddress: string; amount: string }; // tokenAddress of the order to modify and new amount
}

interface ClearOrdersAction {
  type: typeof CLEAR_ORDERS;
}
interface SetTargetTokenAction {
  type: typeof SET_TARGET_TOKEN;
  payload: string;
}
interface SetReceivedAmountAction {
  type: typeof SET_RECEIVED_AMOUNT;
  payload: { tokenAddress: string; receivedAmount: string };
}
export type OrderActionTypes =
  | AddOrderAction
  | RemoveOrderAction
  | ModifyOrderAction
  | ClearOrdersAction
  | SetTargetTokenAction;

export function addOrder(order: Order): AddOrderAction {
  return {
    type: ADD_ORDER,
    payload: order,
  };
}

export function removeOrder(tokenAddress: string): RemoveOrderAction {
  return {
    type: REMOVE_ORDER,
    payload: tokenAddress,
  };
}

export function modifyOrder(
  tokenAddress: string,
  amount: string
): ModifyOrderAction {
  return {
    type: MODIFY_ORDER,
    payload: { tokenAddress, amount },
  };
}

export function clearOrders(): ClearOrdersAction {
  return {
    type: CLEAR_ORDERS,
  };
}
export function setTargetToken(tokenAddress: string): SetTargetTokenAction {
  return {
    type: SET_TARGET_TOKEN,
    payload: tokenAddress,
  };
}

export function setReceivedAmount(
  tokenAddress: string,
  receivedAmount: string
): SetReceivedAmountAction {
  return {
    type: SET_RECEIVED_AMOUNT,
    payload: { tokenAddress, receivedAmount },
  };
}
