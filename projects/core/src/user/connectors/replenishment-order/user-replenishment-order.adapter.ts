import { ReplenishmentOrder } from 'projects/core/src/model';
import { Observable } from 'rxjs';

export abstract class UserReplenishmentOrderAdapter {
  /**
   * Abstract method used to get replenishment order data.
   *
   * @param userId The `userId` for given user
   * @param replenishmentOrderCode The `replenishmentOrderCode` for a given scheduled replenishment
   */
  abstract get(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder>;
}
