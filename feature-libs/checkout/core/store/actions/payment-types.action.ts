import { Action } from '@ngrx/store';
import {
  Cart,
  PaymentType,
  PROCESS_FEATURE,
  StateUtils,
} from '@spartacus/core';
import { GET_PAYMENT_TYPES_PROCESS_ID } from '../checkout-state';

export const LOAD_PAYMENT_TYPES = '[Checkout] Load Payment Types';
export const LOAD_PAYMENT_TYPES_FAIL = '[Checkout] Load Payment Types Fail';
export const LOAD_PAYMENT_TYPES_SUCCESS =
  '[Checkout] Load Payment Types Success';
export const RESET_LOAD_PAYMENT_TYPES_PROCESS_ID =
  '[Checkout] Reset Load Payment Type Process';

export const SET_PAYMENT_TYPE = '[Checkout] Set Payment Type';
export const SET_PAYMENT_TYPE_FAIL = '[Checkout] Set Payment Type Fail';
export const SET_PAYMENT_TYPE_SUCCESS = '[Checkout] Set Payment Type Success';

export class LoadPaymentTypes extends StateUtils.EntityLoadAction {
  readonly type = LOAD_PAYMENT_TYPES;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_PAYMENT_TYPES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
  constructor(public payload: PaymentType[]) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class ResetLoadPaymentTypesProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_LOAD_PAYMENT_TYPES_PROCESS_ID;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class SetPaymentType implements Action {
  readonly type = SET_PAYMENT_TYPE;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      typeCode: string;
      poNumber?: string;
    }
  ) {}
}

export class SetPaymentTypeFail implements Action {
  readonly type = SET_PAYMENT_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class SetPaymentTypeSuccess implements Action {
  readonly type = SET_PAYMENT_TYPE_SUCCESS;
  constructor(public payload: Cart) {}
}

export type PaymentTypesAction =
  | LoadPaymentTypes
  | LoadPaymentTypesFail
  | LoadPaymentTypesSuccess
  | ResetLoadPaymentTypesProcess
  | SetPaymentType
  | SetPaymentTypeFail
  | SetPaymentTypeSuccess;
