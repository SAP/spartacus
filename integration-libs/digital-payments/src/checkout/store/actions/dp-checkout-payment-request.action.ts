import { DP_CHECKOUT_PAYMENT_REQUEST } from '../digital-payments-state';
import { StateUtils } from '@spartacus/core';

export const LOAD_CHECKOUT_PAYMENT_REQUEST =
  '[Digital Payments] Load Checkout Payment Request';
export const CHECKOUT_PAYMENT_REQUEST_SUCCESS =
  '[Digital Payments] Checkout Payment Request Success';
export const CHECKOUT_PAYMENT_REQUSET_FAIL =
  '[Digital Payments] Checkout Payment Request Fail';
export const RESET_CHECKOUT_PAYMENT_REQUEST =
  '[Digital Payments] Reset Checkout Payment Request';

export class LoadCheckoutPaymentRequest extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_PAYMENT_REQUEST;
  constructor() {
    super(DP_CHECKOUT_PAYMENT_REQUEST);
  }
}

export class CheckoutPaymentRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CHECKOUT_PAYMENT_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(DP_CHECKOUT_PAYMENT_REQUEST);
  }
}

export class CheckoutPaymentRequestFail extends StateUtils.LoaderFailAction {
  readonly type = CHECKOUT_PAYMENT_REQUSET_FAIL;
  constructor(public payload: any) {
    super(DP_CHECKOUT_PAYMENT_REQUEST, payload);
  }
}

export class ResetCheckoutPaymentRequest extends StateUtils.LoaderResetAction {
  readonly type = RESET_CHECKOUT_PAYMENT_REQUEST;
  constructor() {
    super(DP_CHECKOUT_PAYMENT_REQUEST);
  }
}

export type CheckoutPaymentRequestAction =
  | LoadCheckoutPaymentRequest
  | CheckoutPaymentRequestSuccess
  | CheckoutPaymentRequestFail
  | ResetCheckoutPaymentRequest;
