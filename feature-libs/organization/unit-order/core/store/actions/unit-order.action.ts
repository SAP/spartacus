import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { UNIT_ORDERS } from '../unit-order-state';

export const LOAD_UNIT_ORDERS = '[Unit Order] Load Unit Orders';
export const LOAD_UNIT_ORDERS_FAIL = '[Unit Order] Load Unit Orders Fail';
export const LOAD_UNIT_ORDERS_SUCCESS = '[Unit Order] Load Unit Orders Success';
export const CLEAR_UNIT_ORDERS = '[Unit Order] Clear Unit Orders';

export class LoadUnitOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_UNIT_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(UNIT_ORDERS);
  }
}

export class LoadUnitOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_UNIT_ORDERS_FAIL;
  constructor(public payload: any) {
    super(UNIT_ORDERS, payload);
  }
}

export class LoadUnitOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_UNIT_ORDERS_SUCCESS;
  constructor(public payload: OrderHistoryList) {
    super(UNIT_ORDERS);
  }
}

export class ClearUnitOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_UNIT_ORDERS;
  constructor() {
    super(UNIT_ORDERS);
  }
}

export type UnitOrdersAction =
  | LoadUnitOrders
  | LoadUnitOrdersFail
  | LoadUnitOrdersSuccess
  | ClearUnitOrders;
