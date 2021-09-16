import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ORDERS } from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_ORDERS = '[User] Load User Orders';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_ORDERS_FAIL = '[User] Load User Orders Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_USER_ORDERS_SUCCESS = '[User] Load User Orders Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_USER_ORDERS = '[User] Clear User Orders';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadUserOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
      replenishmentOrderCode?: string;
    }
  ) {
    super(USER_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadUserOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_ORDERS_FAIL;
  constructor(public payload: any) {
    super(USER_ORDERS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadUserOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_ORDERS_SUCCESS;
  constructor(public payload: OrderHistoryList) {
    super(USER_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearUserOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_ORDERS;
  constructor() {
    super(USER_ORDERS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export type UserOrdersAction =
  | LoadUserOrders
  | LoadUserOrdersFail
  | LoadUserOrdersSuccess
  | ClearUserOrders;
