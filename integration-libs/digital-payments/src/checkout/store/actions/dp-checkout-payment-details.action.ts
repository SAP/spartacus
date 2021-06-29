import { DP_CHECKOUT_PAYMENT_DETAILS } from '../digital-payments-state';
import { StateUtils } from '@spartacus/core';

export const LOAD_CHECKOUT_PAYMENT_DETAILS =
  '[Digital Payments] Load Checkout Payment Details';
export const CHECKOUT_PAYMENT_DETAILS_SUCCESS =
  '[Digital Payments] Checkout Payment Details Success';
export const CHECKOUT_PAYMENT_DETAILS_FAIL =
  '[Digital Payments] Checkout Payment Details Fail';
export const RESET_CHECKOUT_PAYMENT_DETAILS =
  '[Digital Payments] Reset Checkout Payment Details';

export class LoadCheckoutPaymentDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_PAYMENT_DETAILS;
  constructor(
    public payload: {
      sessionId: string;
      signature: string;
    }
  ) {
    super(DP_CHECKOUT_PAYMENT_DETAILS);
  }
}

export class CheckoutPaymentDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CHECKOUT_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: any) {
    super(DP_CHECKOUT_PAYMENT_DETAILS);
  }
}

export class CheckoutPaymentDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = CHECKOUT_PAYMENT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(DP_CHECKOUT_PAYMENT_DETAILS, payload);
  }
}

export class ResetCheckoutPaymentDetails extends StateUtils.LoaderResetAction {
  readonly type = RESET_CHECKOUT_PAYMENT_DETAILS;
  constructor() {
    super(DP_CHECKOUT_PAYMENT_DETAILS);
  }
}

export type CheckoutPaymentDetailsAction =
  | LoadCheckoutPaymentDetails
  | CheckoutPaymentDetailsSuccess
  | CheckoutPaymentDetailsFail
  | ResetCheckoutPaymentDetails;
