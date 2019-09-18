import { Action } from '@ngrx/store';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import {
  StateLoaderActions,
  StateEntityLoaderActions,
} from '../../../state/utils/index';
import { CheckoutDetails } from '../../models/checkout.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  CHECKOUT_DETAILS,
  SET_DELIVERY_ADDRESS_PROCESS_ID,
  SET_PAYMENT_DETAILS_PROCESS_ID,
  SET_DELIVERY_MODE_PROCESS_ID,
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

export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const LOAD_CHECKOUT_DETAILS = '[Checkout] Load Checkout Details';
export const LOAD_CHECKOUT_DETAILS_FAIL =
  '[Checkout] Load Checkout Details Fail';
export const LOAD_CHECKOUT_DETAILS_SUCCESS =
  '[Checkout] Load Checkout Details Success';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';

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

export class SetDeliveryAddress extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = SET_DELIVERY_ADDRESS;
  constructor(
    public payload: { userId: string; cartId: string; address: Address }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class SetDeliveryAddressFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = SET_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID, payload);
  }
}

export class SetDeliveryAddressSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = SET_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class ResetSetDeliveryAddressProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_SET_DELIVERY_ADDRESS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModes extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModesFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class LoadSupportedDeliveryModesSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS;
  constructor(public payload: DeliveryMode[]) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class ResetLoadSupportedDeliveryModesProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

export class SetDeliveryMode extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = SET_DELIVERY_MODE;
  constructor(
    public payload: { userId: string; cartId: string; selectedModeId: string }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class SetDeliveryModeFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = SET_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID, payload);
  }
}

export class SetDeliveryModeSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = SET_DELIVERY_MODE_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class ResetSetDeliveryModeProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_SET_DELIVERY_MODE_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

export class CreatePaymentDetails implements Action {
  readonly type = CREATE_PAYMENT_DETAILS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      paymentDetails: PaymentDetails;
    }
  ) {}
}

export class CreatePaymentDetailsFail implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class CreatePaymentDetailsSuccess implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {}
}

export class SetPaymentDetails extends StateEntityLoaderActions.EntityLoadAction {
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

export class SetPaymentDetailsFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = SET_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID, payload);
  }
}

export class SetPaymentDetailsSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = SET_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class ResetSetPaymentDetailsProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_SET_PAYMENT_DETAILS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
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
  constructor(public payload: Order) {}
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

export class LoadCheckoutDetails extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_DETAILS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CHECKOUT_DETAILS);
  }
}

export class LoadCheckoutDetailsFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_CHECKOUT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(CHECKOUT_DETAILS, payload);
  }
}

export class LoadCheckoutDetailsSuccess extends StateLoaderActions.LoaderSuccessAction {
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

export class ClearCheckoutDeliveryMode implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class ClearCheckoutDeliveryModeSuccess implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS;
  // tslint:disable-next-line:unified-signatures
  constructor(payload: { userId: string; cartId: string });
  /**
   * @deprecated since version 1.2
   * Use constructor(public payload: { userId: string; cartId: string }) instead
   *
   * TODO(issue:#4309) Deprecated since 1.2
   */
  constructor();
  constructor(public payload?: { userId: string; cartId: string }) {}
}

export class ClearCheckoutDeliveryModeFail implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {}
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
  | CheckoutClearMiscsData;
