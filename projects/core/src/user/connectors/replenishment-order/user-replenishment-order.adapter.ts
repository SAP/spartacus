import { Observable } from 'rxjs';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
export abstract class UserReplenishmentOrderAdapter {
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
