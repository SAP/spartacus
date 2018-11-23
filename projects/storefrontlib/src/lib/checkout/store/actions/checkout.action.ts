import { Action } from '@ngrx/store';
import { Address } from '../../models/address-model';

export const ADD_DELIVERY_ADDRESS = '[Checkout] Add Delivery Address';
export const ADD_DELIVERY_ADDRESS_FAIL = '[Checkout] Add Delivery Address Fail';
export const ADD_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Add Delivery Address Success';

export const SET_DELIVERY_ADDRESS = '[Checkout] Set Delivery Address';
export const SET_DELIVERY_ADDRESS_FAIL = '[Checkout] Set Delivery Address Fail';
export const SET_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Set Delivery Address Success';

export const LOAD_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Load Supported Delivery Modes';
export const LOAD_SUPPORTED_DELIVERY_MODES_FAIL =
  '[Checkout] Load Supported Delivery Modes Fail';
export const LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS =
  '[Checkout] Load Supported Delivery Modes Success';
export const CLEAR_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Clear Supported Delivery Modes';

export const SET_DELIVERY_MODE = '[Checkout] Set Delivery Mode';
export const SET_DELIVERY_MODE_FAIL = '[Checkout] Set Delivery Mode Fail';
export const SET_DELIVERY_MODE_SUCCESS = '[Checkout] Set Delivery Mode Success';

export const CREATE_PAYMENT_DETAILS = '[Checkout] Create Payment Details';
export const CREATE_PAYMENT_DETAILS_FAIL =
  '[Checkout] Create Payment Details Fail';
export const CREATE_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Create Payment Details Success';

export const SET_PAYMENT_DETAILS = '[Checkout] Set Payment Details';
export const SET_PAYMENT_DETAILS_FAIL = '[Checkout] Set Payment Details Fail';
export const SET_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Set Payment Details Success';

export const PLACE_ORDER = '[Checkout] Place Order';
export const PLACE_ORDER_FAIL = '[Checkout] Place Order Fail';
export const PLACE_ORDER_SUCCESS = '[Checkout] Place Order Success';

export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

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
  constructor(public payload: Address) {}
}

export class SetDeliveryAddress implements Action {
  readonly type = SET_DELIVERY_ADDRESS;
  constructor(public payload: { userId: any; cartId: any; address: any }) {}
}

export class SetDeliveryAddressFail implements Action {
  readonly type = SET_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class SetDeliveryAddressSuccess implements Action {
  readonly type = SET_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {}
}

export class LoadSupportedDeliveryModes implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class LoadSupportedDeliveryModesFail implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {}
}

export class LoadSupportedDeliveryModesSuccess implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS;
  constructor(public payload: { deliveryModes: { code: string }[] }) {}
}

export class SetDeliveryMode implements Action {
  readonly type = SET_DELIVERY_MODE;
  constructor(
    public payload: { userId: string; cartId: string; selectedModeId: string }
  ) {}
}

export class SetDeliveryModeFail implements Action {
  readonly type = SET_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {}
}

export class SetDeliveryModeSuccess implements Action {
  readonly type = SET_DELIVERY_MODE_SUCCESS;
  constructor(public payload: string) {}
}

export class CreatePaymentDetails implements Action {
  readonly type = CREATE_PAYMENT_DETAILS;
  constructor(
    public payload: { userId: string; cartId: string; paymentDetails: any }
  ) {}
}

export class CreatePaymentDetailsFail implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class CreatePaymentDetailsSuccess implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class SetPaymentDetails implements Action {
  readonly type = SET_PAYMENT_DETAILS;
  constructor(
    public payload: { userId: any; cartId: any; paymentDetails: any }
  ) {}
}

export class SetPaymentDetailsFail implements Action {
  readonly type = SET_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class SetPaymentDetailsSuccess implements Action {
  readonly type = SET_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class PlaceOrder implements Action {
  readonly type = PLACE_ORDER;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class PlaceOrderFail implements Action {
  readonly type = PLACE_ORDER_FAIL;
  constructor(public payload: any) {}
}

export class PlaceOrderSuccess implements Action {
  readonly type = PLACE_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearSupportedDeliveryModes implements Action {
  readonly type = CLEAR_SUPPORTED_DELIVERY_MODES;
}

export class ClearCheckoutStep implements Action {
  readonly type = CLEAR_CHECKOUT_STEP;
  constructor(public payload: number) {}
}

export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

export type CheckoutAction =
  | AddDeliveryAddress
  | AddDeliveryAddressFail
  | AddDeliveryAddressSuccess
  | SetDeliveryAddress
  | SetDeliveryAddressFail
  | SetDeliveryAddressSuccess
  | LoadSupportedDeliveryModes
  | LoadSupportedDeliveryModesFail
  | LoadSupportedDeliveryModesSuccess
  | SetDeliveryMode
  | SetDeliveryModeFail
  | SetDeliveryModeSuccess
  | ClearSupportedDeliveryModes
  | CreatePaymentDetails
  | CreatePaymentDetailsFail
  | CreatePaymentDetailsSuccess
  | SetPaymentDetails
  | SetPaymentDetailsFail
  | SetPaymentDetailsSuccess
  | PlaceOrder
  | PlaceOrderFail
  | PlaceOrderSuccess
  | ClearCheckoutStep
  | ClearCheckoutData;
