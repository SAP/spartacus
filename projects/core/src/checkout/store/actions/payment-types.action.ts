import { Action } from '@ngrx/store';
import { PaymentType } from '../../../model/cart.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID } from '../checkout-state';

export const LOAD_PAYMENT_TYPES = '[Checkout] Load Payment Types';
export const LOAD_PAYMENT_TYPES_FAIL = '[Checkout] Load Payment Fail';
export const LOAD_PAYMENT_TYPES_SUCCESS = '[Checkout] Load Payment Success';

export const SET_PAYMENT_TYPE = '[Checkout] Set Payment Type';
export const SET_PAYMENT_TYPE_FAIL = '[Checkout] Set Payment Type Fail';
export const SET_PAYMENT_TYPE_SUCCESS = '[Checkout] Set Payment Type Success';

export class LoadPaymentTypes extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_PAYMENT_TYPES;
  constructor() {
    super(PROCESS_FEATURE, SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_PAYMENT_TYPES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
  constructor(public payload: PaymentType[]) {
    super(PROCESS_FEATURE, SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID);
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
  // currently API returns cart data. API may be changed.
  constructor(public payload: any) {}
}

export type PaymentTypesAction =
  | LoadPaymentTypes
  | LoadPaymentTypesFail
  | LoadPaymentTypesSuccess
  | SetPaymentType
  | SetPaymentTypeFail
  | SetPaymentTypeSuccess;
