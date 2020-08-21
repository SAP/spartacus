import { StateUtils } from '../../../state/utils/index';
import { USER_REPLENISHMENT_ORDER_DETAILS } from '../user-state';

export const ClEAR_REPLENISHMENT_ORDER_DETAILS =
  '[User] Clear Replenishment Order Details';

export class ClearReplenishmentOrderDetails extends StateUtils.LoaderResetAction {
  readonly type = ClEAR_REPLENISHMENT_ORDER_DETAILS;
  constructor() {
    super(USER_REPLENISHMENT_ORDER_DETAILS);
  }
}

export type UserReplenishmentOrderDetailsAction = ClearReplenishmentOrderDetails;
