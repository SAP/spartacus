import { Action } from '@ngrx/store';
import { Cart } from '@spartacus/core';

export const SET_PAYMENT_TYPE_SUCCESS = '[Checkout] Set Payment Type Success';

export class SetPaymentTypeSuccess implements Action {
  readonly type = SET_PAYMENT_TYPE_SUCCESS;
  constructor(public payload: Cart) {}
}

export type PaymentTypesAction = SetPaymentTypeSuccess;
