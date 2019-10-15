import { Action } from '@ngrx/store';
import { PaymentType } from '../../../model/cart.model';

export const LOAD_PAYMENT_TYPES = '[Checkout] Load Payment Types';
export const LOAD_PAYMENT_TYPES_FAIL = '[Checkout] Load Payment Fail';
export const LOAD_PAYMENT_TYPES_SUCCESS = '[Checkout] Load Payment Success';

export class LoadPaymentTypes implements Action {
  readonly type = LOAD_PAYMENT_TYPES;
  constructor() {}
}

export class LoadPaymentTypesFail implements Action {
  readonly type = LOAD_PAYMENT_TYPES_FAIL;
  constructor(public payload: any) {}
}

export class LoadPaymentTypesSuccess implements Action {
  readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
  constructor(public payload: PaymentType[]) {}
}

export type PaymentTypesAction =
  | LoadPaymentTypes
  | LoadPaymentTypesFail
  | LoadPaymentTypesSuccess;
