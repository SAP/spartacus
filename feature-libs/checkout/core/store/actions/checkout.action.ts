import { Action } from '@ngrx/store';
import {
  Address,
  DeliveryMode,
  MULTI_CART_DATA,
  Order,
  PaymentDetails,
  PROCESS_FEATURE,
  StateUtils,
} from '@spartacus/core';
import { CheckoutDetails } from '../../models/checkout.model';
import {
  CHECKOUT_DETAILS,
  PLACED_ORDER_PROCESS_ID,
  SET_COST_CENTER_PROCESS_ID,
  SET_DELIVERY_ADDRESS_PROCESS_ID,
  SET_DELIVERY_MODE_PROCESS_ID,
  SET_PAYMENT_DETAILS_PROCESS_ID,
  SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID,
} from '../checkout-state';

export const CLEAR_CHECKOUT_DELIVERY_ADDRESS =
  '[Checkout] Clear Checkout Delivery Address';
export const CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Clear Checkout Delivery Address Success';
export const CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL =
  '[Checkout] Clear Checkout Delivery Address Fail';

export const CLEAR_CHECKOUT_DELIVERY_MODE =
  '[Checkout] Clear Checkout Delivery Mode';
export const CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS =
  '[Checkout] Clear Checkout Delivery Mode Success';
export const CLEAR_CHECKOUT_DELIVERY_MODE_FAIL =
  '[Checkout] Clear Checkout Delivery Mode Fail';

export const ADD_DELIVERY_ADDRESS = '[Checkout] Add Delivery Address';
export const ADD_DELIVERY_ADDRESS_FAIL = '[Checkout] Add Delivery Address Fail';
export const ADD_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Add Delivery Address Success';

export const SET_DELIVERY_ADDRESS = '[Checkout] Set Delivery Address';
export const SET_DELIVERY_ADDRESS_FAIL = '[Checkout] Set Delivery Address Fail';
export const SET_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Set Delivery Address Success';
export const RESET_SET_DELIVERY_ADDRESS_PROCESS =
  '[Checkout] Reset Set Delivery Address Process';

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
export const RESET_SET_DELIVERY_MODE_PROCESS =
  '[Checkout] Reset Set Delivery Mode Process';

export const SET_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Set Supported Delivery Modes';
export const SET_SUPPORTED_DELIVERY_MODES_FAIL =
  '[Checkout] Set Supported Delivery Modes Fail';
export const SET_SUPPORTED_DELIVERY_MODES_SUCCESS =
  '[Checkout] Set Supported Delivery Modes Success';
export const RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS =
  '[Checkout] Reset Set Supported Delivery Modes Process';

export const CREATE_PAYMENT_DETAILS = '[Checkout] Create Payment Details';
export const CREATE_PAYMENT_DETAILS_FAIL =
  '[Checkout] Create Payment Details Fail';
export const CREATE_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Create Payment Details Success';

export const SET_PAYMENT_DETAILS = '[Checkout] Set Payment Details';
export const SET_PAYMENT_DETAILS_FAIL = '[Checkout] Set Payment Details Fail';
export const SET_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Set Payment Details Success';
export const RESET_SET_PAYMENT_DETAILS_PROCESS =
  '[Checkout] Reset Set Payment Details Process';

export const PLACE_ORDER = '[Checkout] Place Order';
export const PLACE_ORDER_FAIL = '[Checkout] Place Order Fail';
export const PLACE_ORDER_SUCCESS = '[Checkout] Place Order Success';
export const CLEAR_PLACE_ORDER = '[Checkout] Clear Place Order';

export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const LOAD_CHECKOUT_DETAILS = '[Checkout] Load Checkout Details';
export const LOAD_CHECKOUT_DETAILS_FAIL =
  '[Checkout] Load Checkout Details Fail';
export const LOAD_CHECKOUT_DETAILS_SUCCESS =
  '[Checkout] Load Checkout Details Success';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';
export const PAYMENT_PROCESS_SUCCESS = '[Checkout] Payment Process Success';

export const SET_COST_CENTER = '[Checkout] Set Cost Center';
export const SET_COST_CENTER_FAIL = '[Checkout] Set Cost Center Fail';
export const SET_COST_CENTER_SUCCESS = '[Checkout] Set Cost Center Success';
export const RESET_SET_COST_CENTER_PROCESS =
  '[Checkout] Reset Set Cost Center Process';

export class AddDeliveryAddress implements Action {
  readonly type = ADD_DELIVERY_ADDRESS;
  constructor(
    public payload: { userId: string; cartId: string; address: Address }
  ) {}
}

export class AddDeliveryAddressFail implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class AddDeliveryAddressSuccess implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {}
}

export class SetDeliveryAddress extends StateUtils.EntityLoadAction {
  readonly type = SET_DELIVERY_ADDRESS;
  constructor(
    public payload: { userId: string; cartId: string; address: Address }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class SetDeliveryAddressFail extends StateUtils.EntityFailAction {
  readonly type = SET_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID, payload);
  }
}

export class SetDeliveryAddressSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class ResetSetDeliveryAddressProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_DELIVERY_ADDRESS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModes extends StateUtils.EntityLoadAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS;
  constructor(public payload: DeliveryMode[]) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class ResetLoadSupportedDeliveryModesProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class SetDeliveryMode extends StateUtils.EntityLoadAction {
  readonly type = SET_DELIVERY_MODE;
  constructor(
    public payload: { userId: string; cartId: string; selectedModeId: string }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class SetDeliveryModeFail extends StateUtils.EntityFailAction {
  readonly type = SET_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID, payload);
  }
}

export class SetDeliveryModeSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_DELIVERY_MODE_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class ResetSetDeliveryModeProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_DELIVERY_MODE_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class CreatePaymentDetails extends StateUtils.EntityLoadAction {
  readonly type = CREATE_PAYMENT_DETAILS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      paymentDetails: PaymentDetails;
    }
  ) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class CreatePaymentDetailsFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class CreatePaymentDetailsSuccess implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {}
}

export class PaymentProcessSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PAYMENT_PROCESS_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class SetPaymentDetails extends StateUtils.EntityLoadAction {
  readonly type = SET_PAYMENT_DETAILS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      paymentDetails: PaymentDetails;
    }
  ) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class SetPaymentDetailsFail extends StateUtils.EntityFailAction {
  readonly type = SET_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID, payload);
  }
}

export class SetPaymentDetailsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class ResetSetPaymentDetailsProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_PAYMENT_DETAILS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class PlaceOrder extends StateUtils.EntityLoadAction {
  readonly type = PLACE_ORDER;
  constructor(
    public payload: { userId: string; cartId: string; termsChecked: boolean }
  ) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

export class PlaceOrderFail extends StateUtils.EntityFailAction {
  readonly type = PLACE_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID, payload);
  }
}

export class PlaceOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PLACE_ORDER_SUCCESS;
  constructor(public payload: Order) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

export class ClearPlaceOrder extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_PLACE_ORDER;
  constructor() {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
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

export class LoadCheckoutDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_DETAILS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CHECKOUT_DETAILS);
  }
}

export class LoadCheckoutDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CHECKOUT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(CHECKOUT_DETAILS, payload);
  }
}

export class LoadCheckoutDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CHECKOUT_DETAILS_SUCCESS;
  constructor(public payload: CheckoutDetails) {
    super(CHECKOUT_DETAILS);
  }
}

export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

export class ClearCheckoutDeliveryAddress implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class ClearCheckoutDeliveryAddressSuccess implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS;
  constructor() {}
}

export class ClearCheckoutDeliveryAddressFail implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class ClearCheckoutDeliveryMode extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class ClearCheckoutDeliveryModeSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class ClearCheckoutDeliveryModeFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_FAIL;
  constructor(public payload: { userId: string; cartId: string; error: any }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class SetCostCenter extends StateUtils.EntityLoadAction {
  readonly type = SET_COST_CENTER;
  constructor(
    public payload: { userId: string; cartId: string; costCenterId: string }
  ) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export class SetCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = SET_COST_CENTER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID, payload);
  }
}

export class SetCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_COST_CENTER_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export class ResetSetCostCenterProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_COST_CENTER_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export type CheckoutAction =
  | AddDeliveryAddress
  | AddDeliveryAddressFail
  | AddDeliveryAddressSuccess
  | SetDeliveryAddress
  | SetDeliveryAddressFail
  | SetDeliveryAddressSuccess
  | ResetSetDeliveryAddressProcess
  | LoadSupportedDeliveryModes
  | LoadSupportedDeliveryModesFail
  | LoadSupportedDeliveryModesSuccess
  | SetDeliveryMode
  | SetDeliveryModeFail
  | SetDeliveryModeSuccess
  | ResetSetDeliveryModeProcess
  | ClearSupportedDeliveryModes
  | CreatePaymentDetails
  | CreatePaymentDetailsFail
  | CreatePaymentDetailsSuccess
  | SetPaymentDetails
  | SetPaymentDetailsFail
  | SetPaymentDetailsSuccess
  | ResetSetPaymentDetailsProcess
  | PlaceOrder
  | PlaceOrderFail
  | PlaceOrderSuccess
  | ClearCheckoutStep
  | ClearCheckoutData
  | ClearCheckoutDeliveryAddress
  | ClearCheckoutDeliveryAddressFail
  | ClearCheckoutDeliveryAddressSuccess
  | ClearCheckoutDeliveryMode
  | ClearCheckoutDeliveryModeFail
  | ClearCheckoutDeliveryModeSuccess
  | LoadCheckoutDetails
  | LoadCheckoutDetailsFail
  | LoadCheckoutDetailsSuccess
  | CheckoutClearMiscsData
  | SetCostCenter
  | SetCostCenterFail
  | SetCostCenterSuccess
  | ResetSetCostCenterProcess;
