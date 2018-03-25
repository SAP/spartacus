import { Action } from '@ngrx/store';

export const ADD_DELIVERY_ADDRESS = '[Checkout] Add Delivery Address';
export const ADD_DELIVERY_ADDRESS_FAIL = '[Checkout] Add Delivery Address Fail';
export const ADD_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Add Delivery Address Success';

export class AddDeliveryAddress implements Action {
  readonly type = ADD_DELIVERY_ADDRESS;
  constructor(public payload: any) {}
}

export class AddDeliveryAddressFail implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class AddDeliveryAddressSuccess implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_SUCCESS;
  constructor() {}
}

export type CheckoutAction =
  | AddDeliveryAddress
  | AddDeliveryAddressFail
  | AddDeliveryAddressSuccess;
