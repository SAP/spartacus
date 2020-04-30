import { PaymentType } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
  EntityLoaderResetAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { GET_PAYMENT_TYPES_PROCESS_ID } from '../checkout-state';

export const LOAD_PAYMENT_TYPES = '[Checkout] Load Payment Types';
export const LOAD_PAYMENT_TYPES_FAIL = '[Checkout] Load Payment Types Fail';
export const LOAD_PAYMENT_TYPES_SUCCESS =
  '[Checkout] Load Payment Types Success';
export const RESET_LOAD_PAYMENT_TYPES_PROCESS_ID =
  '[Checkout] Reset Load Payment Type Process';

export class LoadPaymentTypes extends EntityLoadAction {
  readonly type = LOAD_PAYMENT_TYPES;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesFail extends EntityFailAction {
  readonly type = LOAD_PAYMENT_TYPES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class LoadPaymentTypesSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAYMENT_TYPES_SUCCESS;
  constructor(public payload: PaymentType[]) {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export class ResetLoadPaymentTypeProcess extends EntityLoaderResetAction {
  readonly type = RESET_LOAD_PAYMENT_TYPES_PROCESS_ID;
  constructor() {
    super(PROCESS_FEATURE, GET_PAYMENT_TYPES_PROCESS_ID);
  }
}

export type PaymentTypesAction =
  | LoadPaymentTypes
  | LoadPaymentTypesFail
  | LoadPaymentTypesSuccess
  | ResetLoadPaymentTypeProcess;
