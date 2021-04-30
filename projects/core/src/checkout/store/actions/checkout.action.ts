import { Action } from '@ngrx/store';
import { MULTI_CART_DATA } from '../../../cart/store/multi-cart-state';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { StateUtils } from '../../../state/utils/index';
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

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_ADDRESS =
  '[Checkout] Clear Checkout Delivery Address';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Clear Checkout Delivery Address Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL =
  '[Checkout] Clear Checkout Delivery Address Fail';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_MODE =
  '[Checkout] Clear Checkout Delivery Mode';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS =
  '[Checkout] Clear Checkout Delivery Mode Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DELIVERY_MODE_FAIL =
  '[Checkout] Clear Checkout Delivery Mode Fail';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const ADD_DELIVERY_ADDRESS = '[Checkout] Add Delivery Address';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const ADD_DELIVERY_ADDRESS_FAIL = '[Checkout] Add Delivery Address Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const ADD_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Add Delivery Address Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_ADDRESS = '[Checkout] Set Delivery Address';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_ADDRESS_FAIL = '[Checkout] Set Delivery Address Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Set Delivery Address Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_SET_DELIVERY_ADDRESS_PROCESS =
  '[Checkout] Reset Set Delivery Address Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Load Supported Delivery Modes';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_SUPPORTED_DELIVERY_MODES_FAIL =
  '[Checkout] Load Supported Delivery Modes Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS =
  '[Checkout] Load Supported Delivery Modes Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Clear Supported Delivery Modes';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_MODE = '[Checkout] Set Delivery Mode';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_MODE_FAIL = '[Checkout] Set Delivery Mode Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_MODE_SUCCESS = '[Checkout] Set Delivery Mode Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_SET_DELIVERY_MODE_PROCESS =
  '[Checkout] Reset Set Delivery Mode Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Set Supported Delivery Modes';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_SUPPORTED_DELIVERY_MODES_FAIL =
  '[Checkout] Set Supported Delivery Modes Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_SUPPORTED_DELIVERY_MODES_SUCCESS =
  '[Checkout] Set Supported Delivery Modes Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS =
  '[Checkout] Reset Set Supported Delivery Modes Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CREATE_PAYMENT_DETAILS = '[Checkout] Create Payment Details';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CREATE_PAYMENT_DETAILS_FAIL =
  '[Checkout] Create Payment Details Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CREATE_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Create Payment Details Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_DETAILS = '[Checkout] Set Payment Details';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_DETAILS_FAIL = '[Checkout] Set Payment Details Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Set Payment Details Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_SET_PAYMENT_DETAILS_PROCESS =
  '[Checkout] Reset Set Payment Details Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PLACE_ORDER = '[Checkout] Place Order';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PLACE_ORDER_FAIL = '[Checkout] Place Order Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PLACE_ORDER_SUCCESS = '[Checkout] Place Order Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_PLACE_ORDER = '[Checkout] Clear Place Order';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CHECKOUT_DETAILS = '[Checkout] Load Checkout Details';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CHECKOUT_DETAILS_FAIL =
  '[Checkout] Load Checkout Details Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CHECKOUT_DETAILS_SUCCESS =
  '[Checkout] Load Checkout Details Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PAYMENT_PROCESS_SUCCESS = '[Checkout] Payment Process Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_COST_CENTER = '[Checkout] Set Cost Center';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_COST_CENTER_FAIL = '[Checkout] Set Cost Center Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_COST_CENTER_SUCCESS = '[Checkout] Set Cost Center Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_SET_COST_CENTER_PROCESS =
  '[Checkout] Reset Set Cost Center Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class AddDeliveryAddress implements Action {
  readonly type = ADD_DELIVERY_ADDRESS;
  constructor(
    public payload: { userId: string; cartId: string; address: Address }
  ) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class AddDeliveryAddressFail implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class AddDeliveryAddressSuccess implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryAddress extends StateUtils.EntityLoadAction {
  readonly type = SET_DELIVERY_ADDRESS;
  constructor(
    public payload: { userId: string; cartId: string; address: Address }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryAddressFail extends StateUtils.EntityFailAction {
  readonly type = SET_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryAddressSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetSetDeliveryAddressProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_DELIVERY_ADDRESS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_ADDRESS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadSupportedDeliveryModes extends StateUtils.EntityLoadAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadSupportedDeliveryModesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadSupportedDeliveryModesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS;
  constructor(public payload: DeliveryMode[]) {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetLoadSupportedDeliveryModesProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryMode extends StateUtils.EntityLoadAction {
  readonly type = SET_DELIVERY_MODE;
  constructor(
    public payload: { userId: string; cartId: string; selectedModeId: string }
  ) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryModeFail extends StateUtils.EntityFailAction {
  readonly type = SET_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetDeliveryModeSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_DELIVERY_MODE_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetSetDeliveryModeProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_DELIVERY_MODE_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_DELIVERY_MODE_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class CreatePaymentDetailsFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class CreatePaymentDetailsSuccess implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class PaymentProcessSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PAYMENT_PROCESS_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetPaymentDetailsFail extends StateUtils.EntityFailAction {
  readonly type = SET_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetPaymentDetailsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetSetPaymentDetailsProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_PAYMENT_DETAILS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class PlaceOrder extends StateUtils.EntityLoadAction {
  readonly type = PLACE_ORDER;
  constructor(
    public payload: { userId: string; cartId: string; termsChecked: boolean }
  ) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class PlaceOrderFail extends StateUtils.EntityFailAction {
  readonly type = PLACE_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class PlaceOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PLACE_ORDER_SUCCESS;
  constructor(public payload: Order) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearPlaceOrder extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_PLACE_ORDER;
  constructor() {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearSupportedDeliveryModes implements Action {
  readonly type = CLEAR_SUPPORTED_DELIVERY_MODES;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutStep implements Action {
  readonly type = CLEAR_CHECKOUT_STEP;
  constructor(public payload: number) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCheckoutDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_DETAILS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CHECKOUT_DETAILS);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCheckoutDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CHECKOUT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(CHECKOUT_DETAILS, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCheckoutDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CHECKOUT_DETAILS_SUCCESS;
  constructor(public payload: CheckoutDetails) {
    super(CHECKOUT_DETAILS);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryAddress implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS;
  constructor(public payload: { userId: string; cartId: string }) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryAddressSuccess implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS;
  constructor() {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryAddressFail implements Action {
  readonly type = CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryMode extends EntityProcessesIncrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryModeSuccess extends EntityProcessesDecrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearCheckoutDeliveryModeFail extends EntityProcessesDecrementAction {
  readonly type = CLEAR_CHECKOUT_DELIVERY_MODE_FAIL;
  constructor(public payload: { userId: string; cartId: string; error: any }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetCostCenter extends StateUtils.EntityLoadAction {
  readonly type = SET_COST_CENTER;
  constructor(
    public payload: { userId: string; cartId: string; costCenterId: string }
  ) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = SET_COST_CENTER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_COST_CENTER_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetSetCostCenterProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_COST_CENTER_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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
