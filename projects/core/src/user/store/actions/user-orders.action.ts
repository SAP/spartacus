import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ORDERS } from '../user-state';

export const LOAD_USER_ORDERS = '[User] Load User Orders';
export const LOAD_USER_ORDERS_FAIL = '[User] Load User Orders Fail';
export const LOAD_USER_ORDERS_SUCCESS = '[User] Load User Orders Success';
export const CLEAR_USER_ORDERS = '[User] Clear User Orders';

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

export class LoadUserOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_ORDERS_FAIL;
  constructor(public payload: any) {
    super(USER_ORDERS, payload);
  }
}

export class LoadUserOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_ORDERS_SUCCESS;
  constructor(public payload: OrderHistoryList) {
    super(USER_ORDERS);
    console.log('from user-order.action', payload);
  }
}

export class ClearUserOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_ORDERS;
  constructor() {
    super(USER_ORDERS);
  }
}

export type UserOrdersAction =
  | LoadUserOrders
  | LoadUserOrdersFail
  | LoadUserOrdersSuccess
  | ClearUserOrders;
