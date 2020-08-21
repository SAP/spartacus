import { Observable } from 'rxjs';
// import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
export abstract class UserReplenishmentOrderAdapter {
  /**
   * Abstract method used to get replenishment order data.
   *
   * @param userId The `userId` for given user
   * @param replenishmentOrderCode The `replenishmentOrderCode` for a given scheduled replenishment
   */
  // abstract get(
  //   userId: string,
  //   replenishmentOrderCode: string
  // ): Observable<ReplenishmentOrder>;

  /**
  * Abstract method used to load replenishment order history for an user.
  *
  * @param userId The `userId` for given user
  * @param pageSize
  * @param currentPage
  * @param sort Sorting method
  */
  abstract loadHistory(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<ReplenishmentOrderList>;
}


