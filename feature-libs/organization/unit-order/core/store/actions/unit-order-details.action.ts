import { StateUtils } from '@spartacus/core';
import {
  Order,
} from '@spartacus/order/root';
import { UNIT_ORDER_DETAILS } from '../unit-order-state';

export const LOAD_UNIT_ORDER_DETAILS = '[Unit Order] Load Order Details';
export const LOAD_UNIT_ORDER_DETAILS_FAIL = '[Unit Order] Load Order Details Fail';
export const LOAD_UNIT_ORDER_DETAILS_SUCCESS = '[Unit Order] Load Order Details Success';
export const CLEAR_UNIT_ORDER_DETAILS = '[Unit Order] Clear Order Details';


export class LoadUnitOrderDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_UNIT_ORDER_DETAILS;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
    }
  ) {
    super(UNIT_ORDER_DETAILS);
  }
}

export class LoadUnitOrderDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_UNIT_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(UNIT_ORDER_DETAILS, payload);
  }
}

export class LoadUnitOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_UNIT_ORDER_DETAILS_SUCCESS;
  constructor(public payload: Order) {
    super(UNIT_ORDER_DETAILS);
  }
}

export class ClearUnitOrderDetails extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_UNIT_ORDER_DETAILS;
  constructor() {
    super(UNIT_ORDER_DETAILS);
  }
}

export type UnitOrderDetailsAction =
  | LoadUnitOrderDetails
  | LoadUnitOrderDetailsFail
  | LoadUnitOrderDetailsSuccess
  | ClearUnitOrderDetails;
