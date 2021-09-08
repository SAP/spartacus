import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_REPLENISHMENT_ORDERS } from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_REPLENISHMENT_ORDERS =
  '[User] Load User Replenishment Orders';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_REPLENISHMENT_ORDERS_FAIL =
  '[User] Load User Replenishment Orders Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS =
  '[User] Load User Replenishment Orders Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_USER_REPLENISHMENT_ORDERS =
  '[User] Clear User Replenishment Orders';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
    super(USER_REPLENISHMENT_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_FAIL;
  constructor(public payload: any) {
    super(USER_REPLENISHMENT_ORDERS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS;
  constructor(public payload: ReplenishmentOrderList) {
    super(USER_REPLENISHMENT_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_REPLENISHMENT_ORDERS;
  constructor() {
    super(USER_REPLENISHMENT_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export type UserReplenishmentOrdersAction =
  | LoadUserReplenishmentOrders
  | LoadUserReplenishmentOrdersFail
  | LoadUserReplenishmentOrdersSuccess
  | ClearUserReplenishmentOrders;
