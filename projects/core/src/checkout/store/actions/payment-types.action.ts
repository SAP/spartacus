import { Action } from '@ngrx/store';
import { PaymentType, Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
  EntityLoaderResetAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { GET_PAYMENT_TYPES_PROCESS_ID } from '../checkout-state';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_PAYMENT_TYPES = '[Checkout] Load Payment Types';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_PAYMENT_TYPES_FAIL = '[Checkout] Load Payment Types Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_PAYMENT_TYPES_SUCCESS =
  '[Checkout] Load Payment Types Success';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const RESET_LOAD_PAYMENT_TYPES_PROCESS_ID =
  '[Checkout] Reset Load Payment Type Process';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_TYPE = '[Checkout] Set Payment Type';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_TYPE_FAIL = '[Checkout] Set Payment Type Fail';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_TYPE_SUCCESS = '[Checkout] Set Payment Type Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadPaymentTypes extends EntityLoadAction {
  readonly type = LOAD_PAYMENT_TYPES;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadPaymentTypesFail extends EntityFailAction {
  readonly type = LOAD_PAYMENT_TYPES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadPaymentTypesSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
  constructor(public payload: PaymentType[]) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ResetLoadPaymentTypesProcess extends EntityLoaderResetAction {
  readonly type = RESET_LOAD_PAYMENT_TYPES_PROCESS_ID;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetPaymentTypeFail implements Action {
  readonly type = SET_PAYMENT_TYPE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetPaymentTypeSuccess implements Action {
  readonly type = SET_PAYMENT_TYPE_SUCCESS;
  constructor(public payload: Cart) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export type PaymentTypesAction =
  | LoadPaymentTypes
  | LoadPaymentTypesFail
  | LoadPaymentTypesSuccess
  | ResetLoadPaymentTypesProcess
  | SetPaymentType
  | SetPaymentTypeFail
  | SetPaymentTypeSuccess;
