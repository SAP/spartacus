import { StateUtils } from '../../../state/utils/index';
import { USER_REPLENISHMENT_ORDERS } from '../user-state';

export const CLEAR_REPLENISHMENT_USER_ORDERS =
  '[User] Clear User Replenishment Orders';

export class ClearReplenishmentUserOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_REPLENISHMENT_USER_ORDERS;
  constructor() {
    super(USER_REPLENISHMENT_ORDERS);
  }
}

export type UserReplenishmentOrdersAction = ClearReplenishmentUserOrders;
