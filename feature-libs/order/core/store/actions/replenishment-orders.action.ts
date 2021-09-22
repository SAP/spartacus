import { ReplenishmentOrderList, StateUtils } from '@spartacus/core';
import { REPLENISHMENT_ORDERS } from '../order-state';

export const LOAD_USER_REPLENISHMENT_ORDERS =
  '[Order] Load User Replenishment Orders';
export const LOAD_USER_REPLENISHMENT_ORDERS_FAIL =
  '[Order] Load User Replenishment Orders Fail';
export const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS =
  '[Order] Load User Replenishment Orders Success';
export const CLEAR_USER_REPLENISHMENT_ORDERS =
  '[Order] Clear User Replenishment Orders';

export class LoadUserReplenishmentOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(REPLENISHMENT_ORDERS);
  }
}

export class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_FAIL;
  constructor(public payload: any) {
    super(REPLENISHMENT_ORDERS, payload);
  }
}

export class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS;
  constructor(public payload: ReplenishmentOrderList) {
    super(REPLENISHMENT_ORDERS);
  }
}

export class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_REPLENISHMENT_ORDERS;
  constructor() {
    super(REPLENISHMENT_ORDERS);
  }
}

export type UserReplenishmentOrdersAction =
  | LoadUserReplenishmentOrders
  | LoadUserReplenishmentOrdersFail
  | LoadUserReplenishmentOrdersSuccess
  | ClearUserReplenishmentOrders;
