import { Action } from '@ngrx/store';
import { Cart } from '@spartacus/core';

export const SET_PAYMENT_TYPE = '[Checkout] Set Payment Type';
export const SET_PAYMENT_TYPE_FAIL = '[Checkout] Set Payment Type Fail';
export const SET_PAYMENT_TYPE_SUCCESS = '[Checkout] Set Payment Type Success';

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
  | SetPaymentType
  | SetPaymentTypeFail
  | SetPaymentTypeSuccess;
