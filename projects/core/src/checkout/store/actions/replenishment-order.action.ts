import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID } from '../checkout-state';

export const SCHEDULE_REPLENISHMENT_ORDER =
  '[Checkout] Schedule Replenishment Order';
export const SCHEDULE_REPLENISHMENT_ORDER_SUCCESS =
  '[Checkout] Schedule Replenishment Order Success';
export const SCHEDULE_REPLENISHMENT_ORDER_FAIL =
  '[Checkout] Schedule Replenishment Order Fail';
export const CLEAR_SCHEDULE_REPLENISHMENT_ORDER =
  '[Checkout] Clear Schedule Replenishment Data';

export class ScheduleReplenishmentOrder extends StateUtils.EntityLoadAction {
  readonly type = SCHEDULE_REPLENISHMENT_ORDER;
  constructor(
    public payload: {
      cartId: string;
      scheduleReplenishmentForm: ScheduleReplenishmentForm;
      termsChecked: boolean;
      userId: string;
    }
  ) {
    super(PROCESS_FEATURE, SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

export class ScheduleReplenishmentOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SCHEDULE_REPLENISHMENT_ORDER_SUCCESS;
  constructor(public payload: ReplenishmentOrder) {
    super(PROCESS_FEATURE, SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

export class ScheduleReplenishmentOrderFail extends StateUtils.EntityFailAction {
  readonly type = SCHEDULE_REPLENISHMENT_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID, payload);
  }
}

export class ClearScheduleReplenishmentOrderAction extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_SCHEDULE_REPLENISHMENT_ORDER;
  constructor() {
    super(PROCESS_FEATURE, SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID);
  }
}

export type ReplenishmentOrderActions =
  | ScheduleReplenishmentOrder
  | ScheduleReplenishmentOrderSuccess
  | ScheduleReplenishmentOrderFail
  | ClearScheduleReplenishmentOrderAction;
