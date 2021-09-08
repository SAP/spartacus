import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import {
  CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
  USER_REPLENISHMENT_ORDER_DETAILS,
} from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_REPLENISHMENT_ORDER_DETAILS =
  '[User] Load Replenishment Order Details';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS =
  '[User] Load Replenishment Order Details Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL =
  '[User] Load Replenishment Order Details Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const ClEAR_REPLENISHMENT_ORDER_DETAILS =
  '[User] Clear Replenishment Order Details';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_REPLENISHMENT_ORDER = '[User] Cancel Replenishment Order';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_REPLENISHMENT_ORDER_SUCCESS =
  '[User] Cancel Replenishment Order Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_REPLENISHMENT_ORDER_FAIL =
  '[User] Cancel Replenishment Order Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_CANCEL_REPLENISHMENT_ORDER =
  '[User] Clear Cancel Replenishment Order';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadReplenishmentOrderDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_REPLENISHMENT_ORDER_DETAILS;
  constructor(
    public payload: {
      userId: string;
      replenishmentOrderCode: string;
    }
  ) {
    super(USER_REPLENISHMENT_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadReplenishmentOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS;
  constructor(public payload: ReplenishmentOrder) {
    super(USER_REPLENISHMENT_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadReplenishmentOrderDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(USER_REPLENISHMENT_ORDER_DETAILS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearReplenishmentOrderDetails extends StateUtils.LoaderResetAction {
  readonly type = ClEAR_REPLENISHMENT_ORDER_DETAILS;
  constructor() {
    super(USER_REPLENISHMENT_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelReplenishmentOrder extends StateUtils.EntityLoadAction {
  readonly type = CANCEL_REPLENISHMENT_ORDER;
  constructor(
    public payload: {
      userId: string;
      replenishmentOrderCode: string;
    }
  ) {
    super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelReplenishmentOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CANCEL_REPLENISHMENT_ORDER_SUCCESS;
  constructor(public payload: ReplenishmentOrder) {
    super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelReplenishmentOrderFail extends StateUtils.EntityFailAction {
  readonly type = CANCEL_REPLENISHMENT_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearCancelReplenishmentOrder extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_CANCEL_REPLENISHMENT_ORDER;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export type ReplenishmentOrderDetailsAction =
  | LoadReplenishmentOrderDetails
  | LoadReplenishmentOrderDetailsSuccess
  | LoadReplenishmentOrderDetailsFail
  | ClearReplenishmentOrderDetails
  | CancelReplenishmentOrder
  | CancelReplenishmentOrderSuccess
  | CancelReplenishmentOrderFail
  | ClearCancelReplenishmentOrder;
