import { USER_ORDERS } from '../user-state';
import { OrderHistoryList } from '../../../occ/occ-models/index';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';

export const LOAD_USER_ORDERS = '[User] Load User Orders';
export const LOAD_USER_ORDERS_FAIL = '[User] Load User Orders Fail';
export const LOAD_USER_ORDERS_SUCCESS = '[User] Load User Orders Success';
export const CLEAR_USER_ORDERS = '[User] Clear User Orders';

export class LoadUserOrders extends LoaderLoadAction {
  readonly type = LOAD_USER_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(USER_ORDERS);
  }
}

export class LoadUserOrdersFail extends LoaderFailAction {
  readonly type = LOAD_USER_ORDERS_FAIL;
  constructor(public payload: any) {
    super(USER_ORDERS, payload);
  }
}

export class LoadUserOrdersSuccess extends LoaderSuccessAction {
  readonly type = LOAD_USER_ORDERS_SUCCESS;
  constructor(public payload: OrderHistoryList) {
    super(USER_ORDERS);
  }
}

export class ClearUserOrders {
  readonly type = CLEAR_USER_ORDERS;
  constructor() {}
}

export type UserOrdersAction =
  | LoadUserOrders
  | LoadUserOrdersFail
  | LoadUserOrdersSuccess
  | ClearUserOrders;
